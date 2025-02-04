import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Job = ({ job }) => {
    const navigate = useNavigate();
    const [isSaved, setIsSaved] = useState(false);
    const [savedJobs, setSavedJobs] = useState([]);

    useEffect(() => {
        const storedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
        setSavedJobs(storedJobs);
        setIsSaved(storedJobs.some(savedJob => savedJob._id === job._id));
    }, [job]);

    const handleSaveForLater = () => {
        let updatedJobs = [...savedJobs];
        if (isSaved) {
            updatedJobs = updatedJobs.filter(savedJob => savedJob._id !== job._id);
        } else {
            updatedJobs.push({ ...job, logo: job?.company?.logo });
        }
        localStorage.setItem("savedJobs", JSON.stringify(updatedJobs));
        setSavedJobs(updatedJobs);
        setIsSaved(!isSaved);
    };

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    };

    return (
        <motion.div
            className='p-6 rounded-lg shadow-lg bg-white border border-gray-200 transition-transform duration-300'
            whileHover={{ scale: 1.05 }}
        >
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-400'>
                    {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <Button
                    variant="outline"
                    className="rounded-full p-2 text-blue-500 border-red-500 hover:bg-green-700 hover:text-white transition-colors"
                    onClick={handleSaveForLater}
                >
                    <Bookmark size={16} />
                </Button>
            </div>

            <div className='flex items-center gap-4 my-4'>
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                    <Button variant="outline" size="icon" className="p-4">
                        <Avatar>
                            <AvatarImage src={job?.company?.logo} />
                        </Avatar>
                    </Button>
                </motion.div>
                <div>
                    <h1 className='font-semibold text-xl'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>Nepal</p>
                </div>
            </div>

            <div>
                <h2 className='font-bold text-xl text-gray-800 my-3'>{job?.title}</h2>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>

            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-semibold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-red-600 font-semibold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-purple-700 font-semibold'} variant="ghost">RS {job?.salary}</Badge>
            </div>

            <div className='flex items-center gap-4 mt-6'>
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    variant="outline"
                    className="border-purple-500 text-purple-500 hover:bg-green-500 hover:text-white transition-colors"
                >
                    Details
                </Button>
                <Button
                    onClick={handleSaveForLater}
                    className={`${isSaved ? "bg-gray-500" : "bg-green-700"} text-white hover:bg-green-400 transition-colors`}
                >
                    {isSaved ? "Saved" : "Save For Later"}
                </Button>
            </div>
        </motion.div>
    );
};

export default Job;
