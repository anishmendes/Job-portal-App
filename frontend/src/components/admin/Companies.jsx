import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';
import { motion } from 'framer-motion'; // Import Framer Motion for animations
import bg from "../../assets/bg.jpg"; // Ensure correct path to the image

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);

    // Background image styling
    const backgroundStyle = {
        backgroundImage: `url(${bg})`, // Corrected backgroundImage format
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh', // Ensures full page coverage
        padding: '20px',
    };

    // Framer Motion variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8 } },
    };

    return (
        <motion.div style={backgroundStyle}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <motion.div
                    className='flex items-center justify-between my-5'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Input
                        className="w-fit"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button
                        onClick={() => navigate("/admin/companies/create")}
                        whileHover={{ scale: 1.1 }} // Button hover animation
                    >
                        New Company
                    </Button>
                </motion.div>
                <CompaniesTable />
            </div>
        </motion.div>
    );
}

export default Companies;
