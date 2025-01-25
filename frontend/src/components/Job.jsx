import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';

const Job = ({job}) => {
    const navigate = useNavigate();
    // const jobId = "lsekdhjgdsnfvsdkjf";

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }
    
    return (
        <motion.div
            className='p-6 rounded-lg shadow-lg bg-white border border-gray-200 transition-transform duration-300'
            whileHover={{ scale: 1.05 }} // Framer Motion hover animation
        >
            {/* Header Section */}
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-400'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button variant="outline" className="rounded-full p-2 text-blue-500 border-red-500 hover:bg-green-700 hover:text-white transition-colors">
                    <Bookmark size={16} />
                </Button>
            </div>

            {/* Company Section */}
            <div className='flex items-center gap-4 my-4'>
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}> {/* Rotating avatar animation */}
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

            {/* Job Title & Description */}
            <div>
                <h2 className='font-bold text-xl text-gray-800 my-3'>{job?.title}</h2>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>

            {/* Badge Section */}
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-semibold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-red-600 font-semibold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-purple-700 font-semibold'} variant="ghost">RS {job?.salary}</Badge>
            </div>

            {/* Buttons Section */}
            <div className='flex items-center gap-4 mt-6'>
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    variant="outline"
                    className="border-purple-500 text-purple-500 hover:bg-green-500 hover:text-white transition-colors"
                >
                    Details
                </Button>
                <Button
                    className="bg-green-700 text-white hover:bg-green-400 transition-colors"
                >
                    Save For Later
                </Button>
            </div>
        </motion.div>
    )
}

export default Job