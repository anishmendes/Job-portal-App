import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';
import { motion } from 'framer-motion'; // Import Framer Motion for animations
import bg from "../assets/bg.jpg"; // Ensure correct path to the image

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  // Background image styling
  const backgroundStyle = {
    backgroundImage: `url(${bg})`, // Correct backgroundImage format
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh', // Ensures full page coverage
    padding: '20px',
  };

  // Framer Motion variants for smooth animations
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
      <motion.div
        className='max-w-4xl mx-auto border border-gray-200 rounded-2xl my-5 p-8 shadow-lg'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className='flex justify-between'>
          <div className='flex items-center gap-4'>
            <Avatar className="h-28 w-28 border-4 border-black shadow-xl transform hover:scale-110 transition-all duration-300 ease-in-out">
              <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="profile" />
            </Avatar>
            <div>
              <h1 className='font-extrabold text-2xl text-black'>{user?.fullname}</h1>
              <p 
  className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-500 
             bg-clip-text text-transparent transition-all duration-300 
             hover:scale-105 hover:from-purple-500 hover:to-blue-600"
>
  {user?.profile?.bio || "Tell the world about yourself in style! 🚀"}
</p>
            </div>
          </div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Button
              onClick={() => setOpen(true)}
              className="text-right text-lg font-semibold py-2 px-4 border-2 border-gray-500 hover:border-gray-700 rounded-md transition-all duration-300 ease-in-out"
              variant="outline"
            >
              <Pen />
            </Button>
          </motion.div>
        </div>

        <div className='my-6'>
          <div className='flex items-center gap-3 my-3'>
            <Mail className='text-gray-500' />
            <span className='text-lg text-black'>{user?.email}</span>
          </div>
          <div className='flex items-center gap-3 my-3'>
            <Contact className='text-gray-500' />
            <span className='text-lg text-black'>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className='my-6'>
          <h1 className='text-2xl font-bold text-black mb-3'>Skills</h1>
          <div className='flex flex-wrap gap-4'>
  {user?.profile?.skills.length !== 0
    ? user?.profile?.skills.map((item, index) => (
      <motion.div 
        key={index} 
        className="text-lg font-medium py-2 px-4 bg-green-700 text-white rounded-lg shadow-md hover:bg-green-800 hover:shadow-lg transform transition-all duration-300 ease-in-out"
        whileHover={{ scale: 1.1 }}  // Adds hover scaling effect
      >
        {item}
      </motion.div>
    ))
    : <span className='text-black'>NA</span>
  }
</div>

        </div>

        <div className='grid w-full max-w-sm items-center gap-2'>
          <Label className="text-lg font-bold text-black">Resume</Label>
          {isResume ? (
            <a
              target='_blank'
              href={user?.profile?.resume}
              className='text-blue-400 text-lg hover:underline font-semibold transition-all duration-300 ease-in-out'
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className='text-black'>NA</span>
          )}
        </div>
      </motion.div>

      <motion.div
        className='max-w-4xl mx-auto rounded-2xl my-8'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h1 className='font-bold text-2xl text-black my-5'>Applied Jobs</h1>
        <AppliedJobTable />
      </motion.div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </motion.div>
  );
};

export default Profile;
