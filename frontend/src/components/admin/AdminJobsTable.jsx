import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import Framer Motion for animations

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);

    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            }
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    // Framer Motion variants for row animations
    const rowVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className=" p-10 rounded-lg "
        >
            <motion.div
                className="overflow-hidden shadow-lg rounded-xl"
                whileHover={{ scale: 1.02 }} // Slight scaling on hover
                transition={{ duration: 0.4 }}
            >
                <Table className="  rounded-lg">
                    <TableCaption className="text-gray-600 font-semibold pb-4">
                        A list of your recent posted jobs
                    </TableCaption>
                    <TableHeader>
                        <TableRow className="bg-blue-100 text-blue-900">
                            <TableHead className="text-left p-4">Company Name</TableHead>
                            <TableHead className="text-left p-4">Role</TableHead>
                            <TableHead className="text-left p-4">Date</TableHead>
                            <TableHead className="text-right p-4">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filterJobs?.map((job, index) => (
                            <motion.tr
                                key={index}
                                className="hover:bg-blue-200 transition-all duration-300 ease-in-out shadow-sm rounded-lg"
                                variants={rowVariants}
                                whileHover={{ scale: 1.02 }}
                                initial="hidden"
                                animate="visible"
                            >
                                <TableCell className="py-6 px-8">
                                    <div className="flex items-center">
                                        <Avatar className="inline-block mr-4 shadow-md">
                                            <AvatarImage src={job?.company?.logo || ''} alt="Company Logo" />
                                        </Avatar>
                                        <span className="font-semibold text-gray-800">{job?.company?.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="py-6 px-8 text-gray-700">{job?.title}</TableCell>
                                <TableCell className="py-6 px-8 text-gray-600">{job?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell className="py-6 px-8 text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="w-6 h-6 text-gray-600 hover:text-blue-500 transition-colors duration-300" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-40 p-2 shadow-lg rounded-lg border">
                                            <div
                                                onClick={() => navigate(`/admin/companies/${job._id}`)}
                                                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer transition-all duration-200"
                                            >
                                                <Edit2 className="w-4 text-gray-700" />
                                                <span className="text-gray-700">Edit</span>
                                            </div>
                                            <div
                                                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer transition-all duration-200 mt-2"
                                            >
                                                <Eye className="w-4 text-gray-700" />
                                                <span className="text-gray-700">Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </motion.tr>
                        ))}
                    </TableBody>
                </Table>
            </motion.div>
        </motion.div>
    );
};

export default AdminJobsTable;
