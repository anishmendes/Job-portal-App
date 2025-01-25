import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import bg from "../assets/bg.jpg"; // Make sure the path to the background image is correct

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase());
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    // Background image styling
    const backgroundStyle = {
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
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
            <div className="max-w-7xl mx-auto mt-5">
                <div className="flex gap-5">
                    <div className="w-1/5">
                        <FilterCard />
                    </div>
                    <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                        {
                            filterJobs.length <= 0 ? (
                                <span className="text-center text-gray-500 text-lg">Job not found</span>
                            ) : (
                                <div className="grid grid-cols-3 gap-6">
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}
                                                className="p-4  rounded-lg  hover:shadow-xl transition-shadow duration-300"
                                            >
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Jobs;
