import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { motion } from 'framer-motion'; // Import Framer Motion for animations

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    // Framer Motion variants for row animations
    const rowVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
    };

    return (
        <motion.div
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // transition={{ duration: 1 }}
            className="p-10 rounded-lg "
        >
            <motion.div
                className="overflow-hidden shadow-lg rounded-xl"
                // whileHover={{ scale: 1.02 }} // Slight scaling on hover
                // transition={{ duration: 0.4 }}
            >
                <Table className=" rounded-lg">
                    <TableCaption className="text-gray-600 font-semibold pb-4">
                        A list of your recent applied users
                    </TableCaption>
                    <TableHeader>
                        <TableRow className="bg-blue-100 text-blue-900">
                            <TableHead className="text-left p-4">Full Name</TableHead>
                            <TableHead className="text-left p-4">Email</TableHead>
                            <TableHead className="text-left p-4">Contact</TableHead>
                            <TableHead className="text-left p-4">Resume</TableHead>
                            <TableHead className="text-left p-4">Date</TableHead>
                            <TableHead className="text-right p-4">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {applicants?.applications?.map((item, index) => (
                            <motion.tr
                                key={item._id}
                                className="hover:bg-blue-200 transition-all duration-300 ease-in-out shadow-sm rounded-lg"
                                variants={rowVariants}
                                whileHover={{ scale: 1.02, boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)' }} // Box shadow on hover
                                initial="hidden"
                                animate="visible"
                            >
                                <TableCell className="py-6 font-semibold px-8">{item?.applicant?.fullname}</TableCell>
                                <TableCell className="py-6 px-8 font-medium">{item?.applicant?.email}</TableCell>
                                <TableCell className="py-6 px-8 font-medium">{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell className="py-6 px-8 font-bold text-green-600">
                                    {item?.applicant?.profile?.resume ? (
                                        <a
                                            className="text-blue-600 cursor-pointer"
                                            href={item?.applicant?.profile?.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {item?.applicant?.profile?.resumeOriginalName}
                                        </a>
                                    ) : (
                                        <span>NA</span>
                                    )}
                                </TableCell>
                                <TableCell className="py-6 px-8 font-semibold">{item?.applicant?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell className="py-6 px-8 text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="w-6 h-6 text-gray-600 hover:text-blue-500 transition-colors duration-300" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-40 p-2 shadow-lg rounded-lg border">
                                            {shortlistingStatus.map((status, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => statusHandler(status, item?._id)}
                                                    className="flex items-center gap-2 p-2     hover:bg-gray-100 rounded cursor-pointer transition-all duration-200"
                                                >
                                                    <span className="text-gray-700">{status}</span>
                                                </div>
                                            ))}
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

export default ApplicantsTable;
