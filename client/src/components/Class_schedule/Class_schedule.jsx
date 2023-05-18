import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { message } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import AuthLayout from "../../layout/AuthLayout";
import { request } from "../../utils/request";
import { DemoPage } from "../Demo";
import "./Schedule.css";
import ScheduleForm from "./ScheduleForm";

// get?start_time=2023-05-06T16:16:00.07Z&end_time=2023-05-06T16:16:00.07Z

/* [{
    start, => thu may
    end
}]

group by 
thu 2: [{}],
thu 3: [{}] 

*/
function Schedule() {
  const [schedule, setSchedule] = useState({});
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [scheduleData, setScheduleData] = useState(null);
  // const [searchText, setSearchText] = useState('');


  const scheduleDataTable = [
    [
      "",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    ["Morning", "", "", "", "", "", "", ""],
    ["Afternoon", "", "", "", "", "", "", ""],
    ["Evening", "", "", "", "", "", "", ""],
  ];

  useEffect(() => {
    getScheduleStudentId(schedule.student_id)
  }, [schedule]);

  const getScheduleStudentId = async (student_id) => {
    await request.get(`/get_schedule/${student_id}`)
      .then((response) => {
        setSchedule(response.data);
      });
  }

  // const handleDelete = (id) => {
  //   const newSchedule = [...schedule];
  //   request.delete(`/schedule/${id}`).then((response) => {
  //     // console.log(response);
  //     setSchedule(schedule.filter((item) => item.id !== id));
  //     message.success("Delete schedule success!");
  //   });
  // };
  const handleEdit = (body) => {
    setScheduleData(body);
    setShowScheduleForm(true);
  };
  const handlAppSchedule = () => {
    setShowScheduleForm(true);
    setScheduleData(undefined);
  };
  const handleCloseScheduleForm = () => {
    setShowScheduleForm(false);
  };

  const handleSaveStudentForm = (newSchedule) => {
    if (newSchedule && scheduleData && newSchedule.id === scheduleData.id) {
      setSchedule(
        schedule.map((item) =>
          item.id === newSchedule.id ? newSchedule : item
        )
      );
      message.success("Edit schedule success!");
    } else {
      setSchedule([newSchedule, ...schedule]);
      message.success("Add schedule success!");
    }
  };
  const handleSearch = (event) => {
    event.preventDefault();

  };

  return (
    <>
      <AuthLayout>
        <div className="container form-schedule">
          {/* <Carousel className="text-center">
            <Carousel.Item>
              <span className="d-block w-100">{thisWeek}</span>
            </Carousel.Item>
            <Carousel.Item>
              <span className="d-block w-100">{nextWeekStr}</span>
            </Carousel.Item>
            <Carousel.Item>
              <span className="d-block w-100">{nextWeekStr_1}</span>
            </Carousel.Item> */}
          {/* </Carousel> */}
          <form onSubmit={handleSearch}>
            <div className="form-group d-flex">
              <input
                type="text"
                className="form-control"
                placeholder="Nhập mã sinh viên"
                name="student_id"
              />
              <button type="submit" className="btn">
                <i className="mr-2">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </i>
              </button>
            </div>
            {/* {map((body) => (
              <p key={body.id} className="text_name ">
                <strong>{`${body.firstname} ${body.lastname}`}</strong>
              </p>
            ))} */}
          </form>
          <ScheduleForm
            show={showScheduleForm}
            onClose={handleCloseScheduleForm}
            onSave={handleSaveStudentForm}
            scheduleData={scheduleData}
          />
          <DemoPage />
          {/* <Table striped bordered hover>
                        <thead>
                            <tr className="text-center">
                                {scheduleDataTable[0].map((cell, cellIndex) => (
                                    <th key={`cell-${cellIndex}`}>{cell}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {scheduleDataTable.slice(1).map((row, rowIndex) => (

                                <tr className="text-justify" key={`row-${rowIndex}`}>
                                    {row.map((cell, cellIndex) => (
                                        <td key={`cell-${cellIndex}`} onClick={handlAppSchedule} >
                                            {cell ? (
                                                cell
                                            ) : (
                                                ''
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table> */}
        </div>
      </AuthLayout >
    </>
  );
}

export default Schedule;
