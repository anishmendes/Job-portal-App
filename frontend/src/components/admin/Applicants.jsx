import React, { useEffect } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import { motion } from 'framer-motion'; // Import Framer Motion for animations
import bg from "../../assets/bg.jpg"; // Ensure correct path to the image

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllApplicants();
    }, [params.id, dispatch]);

    // Background image styling
    const backgroundStyle = {
        backgroundImage: `url(${bg})`, // Set the background image
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
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <motion.h1
                    className='font-bold text-xl my-5'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    Applicants {applicants?.applications?.length}
                </motion.h1>
                <ApplicantsTable />
            </div>
        </motion.div>
    );
};

export default Applicants;
