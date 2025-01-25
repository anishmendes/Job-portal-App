import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion'; // Framer Motion for animations
import bgImage from '../../assets/bg.jpg'; 

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', minHeight: '100vh' }}>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <motion.form 
                    onSubmit={submitHandler} 
                    className='w-1/2 bg-white/80 backdrop-blur-lg border border-gray-200 rounded-md p-6 my-10 shadow-xl'
                    initial={{ opacity: 0, y: 50 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.5 }}
                >
                    <h1 className='font-bold text-2xl mb-5 text-center text-blue-700'>Login</h1>
                    
                    <div className='my-4'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="demouser@gmail.com"
                            className='border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 shadow-md transition duration-300'
                        />
                    </div>

                    <div className='my-4'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="demo123456"
                            className='border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 shadow-md transition duration-300'
                        />
                    </div>
                    
                    <RadioGroup className="flex items-center gap-6 my-5">
                        <div className="flex items-center space-x-2">
                            <Input
                                type="radio"
                                name="role"
                                value="student"
                                checked={input.role === 'student'}
                                onChange={changeEventHandler}
                                className="cursor-pointer"
                            />
                            <Label>Student</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Input
                                type="radio"
                                name="role"
                                value="recruiter"
                                checked={input.role === 'recruiter'}
                                onChange={changeEventHandler}
                                className="cursor-pointer"
                            />
                            <Label>Recruiter</Label>
                        </div>
                    </RadioGroup>

                    {
                        loading 
                        ? <Button className="w-full my-4 bg-gray-400 cursor-not-allowed"> 
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait 
                          </Button> 
                        : <Button 
                            type="submit" 
                            className="w-full my-4 bg-blue-700 text-white hover:bg-blue-600 transition-all duration-300"
                          >
                            Login
                          </Button>
                    }

                    <span className='text-sm block text-center'>Don't have an account? 
                        <Link to="/signup" className='text-blue-600 ml-1 hover:underline'>Signup</Link>
                    </span>
                </motion.form>
            </div>
        </div>
    );
};

export default Login;
