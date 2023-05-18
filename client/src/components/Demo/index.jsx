import { EditingState, ViewState } from "@devexpress/dx-react-scheduler";
import {
  AppointmentForm,
  AppointmentTooltip,
  Appointments,
  ConfirmationDialog,
  DateNavigator,
  EditRecurrenceMenu,
  Scheduler,
  TodayButton,
  Toolbar,
  WeekView,
  Resources
} from "@devexpress/dx-react-scheduler-material-ui";
import Paper from "@mui/material/Paper";
import moment from "moment";
import * as React from "react";
import { request } from "../../utils/request";
import { keys } from "@mui/system";
import { message } from "antd";
const Appointment = ({ data, ...props }) => {
  return <div {...props} style={{ cursor: 'pointer', color: '#fff', padding: 10 }}>
    <p>
      <span>Subject: </span>
      {data.subject_name}
    </p>
    <p>
      <span>Class: </span>
      {data.classroom}
    </p>
    <p>
      <span>Teacher: </span>
      {data.lastname}
    </p>

  </div>
}

const BasicLayout = ({ ...restProps }) => {
  return < AppointmentForm.BasicLayout {...restProps} booleanEditorComponent={BooleanEditor} textEditorComponent={TextEditor} />
};

const BooleanEditor = props => {
  console.log({ s: props.label })
  if (["Repeat", 'All Day'].includes(props.label)) {
    return null;
  }
  return <AppointmentForm.BooleanEditor {...props} />;
};

const ResourceEditor = props => {
  if (props.resource.fieldName === "allDate") {
    return null;
  }
  return <AppointmentForm.ResourceEditor {...props} />;
};

const TextEditor = props => {
  if (["Notes", 'Title'].includes(props.placeholder)) {
    return null;
  }
  return <AppointmentForm.TextEditor {...props} />;
};

export const DemoPage = () => {
  const [data, setData] = React.useState([]);

  const [currentDate, setCurrentDate] = React.useState(
    moment().format("YYYY-MM-DD")
  );
  const [addedAppointment, setAddedAppointment] = React.useState({});
  const [appointmentChanges, setAppointmentChanges] = React.useState({});
  const [editingAppointment, setEditingAppointment] = React.useState();
  const [teacherList, setTeacherList] = React.useState([]);
  const [subjectList, setSubjectList] = React.useState([]);
  const [formDataSchedule, setFormDataSchedule] = React.useState({});


  const currentDateChange = (currentDate) => {
    setCurrentDate(currentDate);
  };

  function changeAddedAppointment(addedAppointment) {
    setAddedAppointment(addedAppointment);
  }

  function changeAppointmentChanges(appointmentChanges) {
    setAppointmentChanges(appointmentChanges);
  }

  function changeEditingAppointment(editingAppointment) {
    console.log({ editingAppointment })
    setEditingAppointment(editingAppointment);
  }
  const handleSave = (student_id) => {
    const formData = {
      ...formDataSchedule,
      student_id: student_id
    };
    if (editingAppointment) {
      // Nếu đang chỉnh sửa, gọi API cập nhật lịch trình
      request.put(`/schedule/${editingAppointment.student_id}`, formData)
        .then((response) => {
          setData(response.data);
          message.success("Update schedule success!");
        })

    } else {
      // Nếu không có `editingAppointment`, tức là tạo mới lịch trình
      request.post("/schedule/new", formData)
        .then((response) => {
          setData(response.data);
          message.success("Create schedule success!");
        })

    }
  };
  const handleDelete = (schedule_id) => {
    request.delete(`/schedule/${schedule_id}`)
      .then((response) => {
        setData(response.data);
        message.success("Delete schedule success!");
      })

  };

  function commitChanges({ added, changed, deleted }) {
    console.log(added)
    // kiem tra add co ton tai hay khong
    // goi api



    if (added) {
      const newAppointment = { ...addedAppointment, ...added };
      handleSave(newAppointment.student_id);
      setAddedAppointment({});
    }
    if (changed) {
      const updatedAppointment = { ...data.find((appointment) => appointment.id === editingAppointment), ...changed[editingAppointment] };
      handleSave(updatedAppointment.student_id);
      setEditingAppointment(null);
      setAppointmentChanges({});
    }
    if (deleted !== undefined) {
      const deletedAppointment = data.find((appointment) => appointment.id === deleted);
      handleDelete(deletedAppointment.schedule_id);
    }




    // setData((data) => {
    //   if (added) {
    //     const startingAddedId =
    //       data.length > 0 ? data[data.length - 1].id + 1 : 0;
    //     data = [...data, { id: startingAddedId, ...added }];
    //   }
    //   if (changed) {
    //     data = data.map((appointment) =>
    //       changed[appointment.id]
    //         ? { ...appointment, ...changed[appointment.id] }
    //         : appointment
    //     );
    //     // goi len server update neu thanh cong thi map 
    //   }
    //   if (deleted !== undefined) {
    //     data = data.filter((appointment) => appointment.id !== deleted);
    //   }
    //   return data;
    // });
  }
  React.useEffect(() => {
    getScheduleStudentId(data.student_id)
  }, [data]);
  const getScheduleStudentId = async (student_id) => {
    request.get(`/get_schedule/${student_id}`).then((response) => {
      console.log(response.data);
      setData(
        response.data.map((item) => {
          return {
            ...item,
            startDate: moment(item.start_time),
            endDate: moment(item.end_time),
            // title: (
            //   <div>
            //     <p>
            //       <span>Subject: </span>
            //       {item.subject_name}
            //     </p>
            //     <p>
            //       <span>Class: </span>
            //       {item.classroom}
            //     </p>
            //     <p>
            //       <span>Teacher: </span>
            //       {item.lastname}
            //     </p>
            //   </div>
            // ),
            title: item.subject_name, // tam thoi de ntn de test edit kiem cach custom render sau
            location: item.classroom,
            id: item.id,
          };
        })
      );
    });
  }
  React.useEffect(() => {
    request.get("/get_teacher").then((response) => {
      setTeacherList(response.data)
    })
  }, [])
  React.useEffect(() => {

    request.get("/get_subject").then((response) => {

      setSubjectList(response.data)
    })
  }, [])
  console.log(subjectList)
  return (
    <Paper>
      <Scheduler data={data} height={660} locale={"vi-VN"} appointmentComponent={Appointment}
      >
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={currentDateChange}
        />
        <EditingState
          onCommitChanges={commitChanges}
          addedAppointment={addedAppointment}
          onAddedAppointmentChange={changeAddedAppointment}
          appointmentChanges={appointmentChanges}
          onAppointmentChangesChange={changeAppointmentChanges}
          editingAppointment={editingAppointment}
          onEditingAppointmentChange={changeEditingAppointment}
        />
        <WeekView startDayHour={9} endDayHour={19} />
        <Toolbar />
        <DateNavigator />
        {/* <TodayButton /> */}
        {/* <Appointments /> */}
        {/* <AllDayPanel /> */}
        <EditRecurrenceMenu />
        <ConfirmationDialog />
        <Appointments appointmentContentComponent={Appointment} />
        <AppointmentTooltip showOpenButton showDeleteButton />
        <AppointmentForm basicLayoutComponent={BasicLayout} />
        <Resources data={[{
          fieldName: "subject_id",
          title: "Subject",
          instances:
            subjectList.map((body) => {
              return {
                text: body.subject_name,
                id: body.subject_id
              }
            })

          // map data mon hoc vo day lay mon hoc tu server nha
        },
        {
          fieldName: "teacher_id",
          title: "Teacher",
          instances:
            teacherList.map((body) => {
              return {
                text: body.lastname,
                id: body.id

              }
            })
          , // map data teacher vo day lay teacher tu server nha
        }]} mainResourceName="schedule" />

      </Scheduler>
    </Paper>
  );
};
