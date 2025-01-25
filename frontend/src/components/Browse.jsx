import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion } from 'framer-motion';
import bg from "../assets/bg.jpg"; // Ensure correct path to the background image

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        };
    }, []);

    // Framer Motion Variants for Animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8 } },
    };

    const jobCardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    // Background image styling
    const backgroundStyle = {
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '20px',
    };

    return (
        <motion.div
            style={backgroundStyle} // Adding the background image style
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <Navbar />
            <div className="max-w-7xl mx-auto my-10">
                <motion.h1
                    className="font-bold text-xl my-10 text-white" // Make sure the text is readable with the background
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Search Results ({allJobs.length})
                </motion.h1>
                <div className="grid grid-cols-3 gap-4">
                    {
                        allJobs.map((job) => (
                            <motion.div
                                key={job._id}
                                variants={jobCardVariants}
                                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                                className="p-4 rounded-lg  hover:shadow-xl transition-shadow duration-300"
                            >
                                <Job job={job} />
                            </motion.div>
                        ))
                    }
                </div>
            </div>
        </motion.div>
    );
};

export default Browse;
