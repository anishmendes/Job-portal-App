import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import AdminJobsTable from './AdminJobsTable';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '@/redux/jobSlice';
import { motion } from 'framer-motion'; // Import Framer Motion for animations
import bg from "../../assets/bg.jpg"; // Ensure correct path to the image

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
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
    <motion.div
      style={backgroundStyle}
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
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          />
          <motion.div
            whileHover={{ scale: 1.1 }} // Button hover animation
          >
            <Button onClick={() => navigate("/admin/jobs/create")}>
              New Job
            </Button>
          </motion.div>
        </motion.div>
        <AdminJobsTable />
      </div>
    </motion.div>
  );
};

export default AdminJobs;
