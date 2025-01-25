import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);

    return (
        <div className="p-6 ">
            <Table className="shadow-lg rounded-lg overflow-hidden border border-gray-200">
                <TableCaption className="text-lg font-semibold text-gray-700">A list of your applied jobs</TableCaption>
                <TableHeader className="bg-blue-100">
                    <TableRow>
                        <TableHead className="text-left text-lg font-medium text-blue-700">Date</TableHead>
                        <TableHead className="text-left text-lg font-medium text-blue-700">Job Role</TableHead>
                        <TableHead className="text-left text-lg font-medium text-blue-700">Company</TableHead>
                        <TableHead className="text-right text-lg font-medium text-blue-700">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center text-gray-500 py-4">You haven't applied for any job yet.</td>
                            </tr>
                        ) : allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id} className="hover:shadow-md transition-shadow duration-300 font-semibold">
                                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>{appliedJob.job?.title}</TableCell>
                                <TableCell>{appliedJob.job?.company?.name}</TableCell>
                                <TableCell className="text-right">
                                    <Badge className={`${appliedJob?.status === "rejected" ? 'bg-red-600' : appliedJob.status === 'pending' ? 'bg-yellow-600' : 'bg-green-700'} text-white px-2 py-1 rounded-lg`}>
                                        {appliedJob.status.toUpperCase()}
                                    </Badge>
                                    <button className="ml-4 bg-blue-500 text-white px-3 py-1 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200">View</button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default AppliedJobTable;
