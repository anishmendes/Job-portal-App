import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { motion } from 'framer-motion'; // Import Framer Motion for animations
import bg from "../assets/bg.jpg"; // Ensure the correct path to the image

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true); // Update the local state
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
                dispatch(setSingleJob(updatedSingleJob)); // Helps us to update the UI in real-time
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id)); // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    // Background image styling
    const backgroundStyle = {
        backgroundImage: `url(${bg})`,
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
        <motion.div
            style={backgroundStyle}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className='max-w-7xl mx-auto my-10 bg-white bg-opacity-90 p-8 rounded-xl shadow-md'>
                <motion.div
                    className='flex items-center justify-between'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div>
                        <h1 className='font-bold text-2xl text-[#7209b7] mb-3'>{singleJob?.title}</h1>
                        <div className='flex items-center gap-3 mt-4'>
                            <Badge className='text-blue-700 font-semibold' variant="ghost">{singleJob?.position} Positions</Badge>
                            <Badge className='text-[#F83002] font-semibold' variant="ghost">{singleJob?.jobType}</Badge>
                            <Badge className='text-[#7209b7] font-semibold' variant="ghost">RS{singleJob?.salary}</Badge>
                        </div>
                    </div>
                    <motion.div whileHover={{ scale: 1.1 }}>
                        <Button
                            onClick={isApplied ? null : applyJobHandler}
                            disabled={isApplied}
                            className={`rounded-lg px-6 py-3 ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'} text-white`}
                        >
                            {isApplied ? 'Already Applied' : 'Apply Now'}
                        </Button>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    <h1 className='border-b-2 border-b-gray-300 font-medium py-4 mt-5'>Job Description</h1>
                    <div className='my-4 text-gray-700'>
                    <h1 className='font-bold text-lg text-[#3e39dc] flex items-center'>
        Role: 
        <span className='pl-4 text-gray-800  rounded-md px-2 py-1 font-normal hover:bg-[#e0d4ff] transition-all duration-300'>
            {singleJob?.title}
        </span>
    </h1>
    <h1 className='font-bold text-lg text-[#3e39dc] flex items-center'>
        Location: 
        <span className='pl-4 text-gray-800  rounded-md px-2 py-1 font-normal hover:bg-[#e0d4ff] transition-all duration-300'>
            {singleJob?.location}
        </span>
    </h1>
    <h1 className='font-bold text-lg text-[#3e39dc] flex items-center'>
        Description: 
        <span className='pl-4 text-gray-800  rounded-md px-2 py-1 font-normal hover:bg-[#e0d4ff] transition-all duration-300'>
            {singleJob?.description}
        </span>
    </h1>
    <h1 className='font-bold text-lg text-[#3e39dc] flex items-center'>
        Experience: 
        <span className='pl-4 text-gray-800  rounded-md px-2 py-1 font-normal hover:bg-[#e0d4ff] transition-all duration-300'>
            {singleJob?.experience} yrs
        </span>
    </h1>
    <h1 className='font-bold text-lg text-[#3e39dc] flex items-center'>
        Salary: 
        <span className='pl-4 text-gray-800  rounded-md px-2 py-1 font-normal hover:bg-[#e0d4ff] transition-all duration-300'>
            RS {singleJob?.salary}
        </span>
    </h1>
    <h1 className='font-bold text-lg text-[#3e39dc] flex items-center'>
        Total Applicants: 
        <span className='pl-4 text-gray-800  rounded-md px-2 py-1 font-normal hover:bg-[#e0d4ff] transition-all duration-300'>
            {singleJob?.applications?.length}
        </span>
    </h1>
    <h1 className='font-bold text-lg text-[#3e39dc] flex items-center'>
        Posted Date: 
        <span className='pl-4 text-gray-800  rounded-md px-2 py-1 font-normal hover:bg-[#e0d4ff] transition-all duration-300'>
            {singleJob?.createdAt.split("T")[0]}
        </span>
    </h1>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default JobDescription;
