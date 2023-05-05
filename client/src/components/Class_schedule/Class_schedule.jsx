import React, { useContext } from 'react'
import { Table } from 'react-bootstrap';
import AuthLayout from '../../layout/AuthLayout';
import { AppContext } from "../../App";
function Class_schedule() {
    const { isUser } = useContext(AppContext)
    const scheduleData = [
        ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        ["Morning", "", "", "", "", "", "", ""],
        ["Afternoon", "", "", "", "", "", "", ""],
        ["Evening", "", "", "", "", "", "", ""],
    ];


    return (
        <>
            {isUser && (
                <AuthLayout>
                    <div className="container">
                        <h1 className="mt-3 mb-4 d-flex justify-content-center">Class Schedule</h1>
                        <Table striped bordered hover>
                            <thead>
                                <tr className="text-center">
                                    {scheduleData[0].map((cell, cellIndex) => (
                                        <th key={`cell-${cellIndex}`}>{cell}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {scheduleData.slice(1).map((row, rowIndex) => (
                                    <tr className="text-justify" key={`row-${rowIndex}`} >
                                        {row.map((cell, cellIndex) => (
                                            <td key={`cell-${cellIndex}`}>
                                                {cell ? cell : "HP: Tài chính DN (1-4)GV: Huỳnh Thị Mỹ Duyên Phòng: 8.3.26"}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </AuthLayout>
            )}

        </>
    );
}


export default Class_schedule