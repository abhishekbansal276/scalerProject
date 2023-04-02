const express = require("express");
const app = express();
const cors = require("cors");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const PORT = 5000;

let employees = {
  employees: [
    {
      name: "ABHI",
      uid: "20TEC0987",
      pin: "1234",
      totalStudents: 0,
      assignedStudents: [],
    },
    {
      name: "HARSH",
      uid: "20TEC1111",
      pin: "1234",
      totalStudents: 0,
      assignedStudents: [],
    },
    {
      name: "AMAN",
      uid: "20TEC0000",
      pin: "1234",
      totalStudents: 0,
      assignedStudents: [],
    },
    {
      name: "ADITYA",
      uid: "20TEC9010",
      pin: "1234",
      totalStudents: 0,
      assignedStudents: [],
    },
    {
      name: "YOGESH",
      uid: "20TEC1180",
      pin: "1234",
      totalStudents: 0,
      assignedStudents: [],
    },
    {
      name: "YASH",
      uid: "20TEC2981",
      pin: "1234",
      totalStudents: 0,
      assignedStudents: [],
    },
  ],
};

let students = {
  student: [
    { name: "Student1", assigned: 0 },
    { name: "Student2", assigned: 0 },
    { name: "Student3", assigned: 0 },
    { name: "Student4", assigned: 0 },
    { name: "Student5", assigned: 0 },
    { name: "Student6", assigned: 0 },
    { name: "Student7", assigned: 0 },
    { name: "Student8", assigned: 0 },
    { name: "Student9", assigned: 0 },
    { name: "Student10", assigned: 0 },
    { name: "Student11", assigned: 0 },
    { name: "Student12", assigned: 0 },
    { name: "Student13", assigned: 0 },
    { name: "Student14", assigned: 0 },
    { name: "Student15", assigned: 0 },
    { name: "Student16", assigned: 0 },
    { name: "Student17", assigned: 0 },
    { name: "Student18", assigned: 0 },
  ],
};

let assignedStudentList = {
  assignedStudentList: [
    { uid: "20TEC0987", stu1: "", stu2: "", stu3: "", stu4: "" },
    { uid: "20TEC1111", stu1: "", stu2: "", stu3: "", stu4: "" },
    { uid: "20TEC0000", stu1: "", stu2: "", stu3: "", stu4: "" },
    { uid: "20TEC9010", stu1: "", stu2: "", stu3: "", stu4: "" },
    { uid: "20TEC1180", stu1: "", stu2: "", stu3: "", stu4: "" },
    { uid: "20TEC2981", stu1: "", stu2: "", stu3: "", stu4: "" },
  ],
};

let studentsMarks = {
  studentsMarks: [
    { uid: "20TEC0987", studentsMark: [] },
    { uid: "20TEC1111", studentsMark: [] },
    { uid: "20TEC0000", studentsMark: [] },
    { uid: "20TEC9010", studentsMark: [] },
    { uid: "20TEC1180", studentsMark: [] },
    { uid: "20TEC2981", studentsMark: [] },
  ],
};

app.get("/", (req, res) => {
  res.send("Hello from root side");
});

app.post("/finalSubmit", (req, res) => {
  let name = req.body.name;
  let uid = req.body.uid;
  const index = studentsMarks.studentsMarks.findIndex((s) => s.uid === uid);
  const index1 = studentsMarks.studentsMarks[index].studentsMark.findIndex(
    (s) => s.name === name
  );
  if (index !== -1) {
    studentsMarks.studentsMarks[index].studentsMark[index1].finalOrNot = 1;
  }
  res.status(200);
  res.json(studentsMarks);
});

app.post("/updateMarks", (req, res) => {
  let name = req.body.name;
  let uid = req.body.uid;
  let totalMarks = req.body.totalMarks;
  const index = studentsMarks.studentsMarks.findIndex((s) => s.uid === uid);
  const index1 = studentsMarks.studentsMarks[index].studentsMark.findIndex(
    (s) => s.name === name
  );
  if (index !== -1) {
    if (index1 === -1) {
      studentsMarks.studentsMarks[index].studentsMark.push({
        name: name,
        marks: totalMarks,
        finalOrNot: 0,
      });
    } else {
      if (
        studentsMarks.studentsMarks[index].studentsMark[index1].finalOrNot === 0
      ) {
        studentsMarks.studentsMarks[index].studentsMark[index1].marks =
          totalMarks;
      } else {
        res.status(300);
        res.json(studentsMarks);
      }
    }
  }
  res.status(200);
  res.json(studentsMarks);
});

app.post("/getMarks", (req, res) => {
  let name = req.body.name;
  let uid = req.body.uid;
  let totalMarks = req.body.totalMarks;
  const index = studentsMarks.studentsMarks.findIndex((s) => s.uid === uid);
  const index1 = studentsMarks.studentsMarks[index].studentsMark.findIndex(
    (s) => s.name === name
  );
  res.status(200);
  res.json(studentsMarks.studentsMarks[index].studentsMark);
});

app.post("/updateStudent", (req, res) => {
  let name = req.body.name;
  const index = students.student.findIndex((s) => s.name === name);
  if (index !== -1) {
    students.student[index].assigned = 1;
  }
  res.status(200);
  res.json(students);
});

app.post("/updateStudentToZero", (req, res) => {
  let name = req.body.name;
  const index = students.student.findIndex((s) => s.name === name);
  if (index !== -1) {
    students.student[index].assigned = 0;
  }
  res.status(200);
  res.json(students);
});

app.post("/addStudentToTeacher", (req, res) => {
  let name = req.body.stuName;
  let userUid = req.body.uid;

  const index = employees.employees.findIndex((s) => s.uid === userUid);
  if (index !== -1) {
    employees.employees[index].assignedStudents.push(name);
  }
  res.status(200);
  res.json(employees);
});

app.post("/removeStudentToTeacher", (req, res) => {
  let name = req.body.stuName;
  let userUid = req.body.uid;

  const index = employees.employees.findIndex((s) => s.uid === userUid);
  if (index !== -1) {
    employees.employees[index].assignedStudents.push(name);
  }
  res.status(200);
  res.json(employees);
});

app.post("/setStudentList", (req, res) => {
  let name = req.body.name;
  let uid = req.body.uid;
  const index = assignedStudentList.assignedStudentList.findIndex(
    (s) => s.uid === uid
  );
  if (index !== -1) {
    if (assignedStudentList.assignedStudentList[index].stu1 === "") {
      assignedStudentList.assignedStudentList[index].stu1 = name;
    } else if (assignedStudentList.assignedStudentList[index].stu2 === "") {
      assignedStudentList.assignedStudentList[index].stu2 = name;
    } else if (assignedStudentList.assignedStudentList[index].stu3 === "") {
      assignedStudentList.assignedStudentList[index].stu3 = name;
    } else {
      assignedStudentList.assignedStudentList[index].stu4 = name;
    }
  }
  res.status(200);
  res.json({
    stu1: assignedStudentList.assignedStudentList[index].stu1,
    stu2: assignedStudentList.assignedStudentList[index].stu2,
    stu3: assignedStudentList.assignedStudentList[index].stu3,
    stu4: assignedStudentList.assignedStudentList[index].stu4,
  });
});

app.post("/removeFromStudentList", (req, res) => {
  let name = req.body.name;
  let uid = req.body.uid;
  const index = assignedStudentList.assignedStudentList.findIndex(
    (s) => s.uid === uid
  );
  if (index !== -1) {
    if (assignedStudentList.assignedStudentList[index].stu1 === name) {
      assignedStudentList.assignedStudentList[index].stu1 = "";
    } else if (assignedStudentList.assignedStudentList[index].stu2 === name) {
      assignedStudentList.assignedStudentList[index].stu2 = "";
    } else if (assignedStudentList.assignedStudentList[index].stu3 === name) {
      assignedStudentList.assignedStudentList[index].stu3 = "";
    } else {
      assignedStudentList.assignedStudentList[index].stu4 = "";
    }
  }
  res.status(200);
  res.json({
    stu1: assignedStudentList.assignedStudentList[index].stu1,
    stu2: assignedStudentList.assignedStudentList[index].stu2,
    stu3: assignedStudentList.assignedStudentList[index].stu3,
    stu4: assignedStudentList.assignedStudentList[index].stu4,
  });
});

app.post("/returnStudentList", (req, res) => {
  let userUid = req.body.uid;
  const index = assignedStudentList.assignedStudentList.findIndex(
    (s) => s.uid === userUid
  );
  if (index != -1) {
    res.status(200);
    res.json({
      stu1: assignedStudentList.assignedStudentList[index].stu1,
      stu2: assignedStudentList.assignedStudentList[index].stu2,
      stu3: assignedStudentList.assignedStudentList[index].stu3,
      stu4: assignedStudentList.assignedStudentList[index].stu4,
    });
  }
});

app.post("/updateStudentCountTeacher", (req, res) => {
  let uid = req.body.uid;
  const index = employees.employees.findIndex((s) => s.uid === uid);
  if (index !== -1) {
    employees.employees[index].totalStudents++;
  }
  res.status(201);
  res.json({ toStu: employees.employees[index].totalStudents });
});

app.post("/updateStudentCountTeacherAfterRemove", (req, res) => {
  let uid = req.body.uid;
  const index = employees.employees.findIndex((s) => s.uid === uid);
  if (index !== -1) {
    employees.employees[index].totalStudents--;
  }
  res.status(201);
  res.json({ toStu: employees.employees[index].totalStudents });
});

app.get("/api", (req, res) => {
  res.json(employees);
});

app.get("/student", (req, res) => {
  res.json(students);
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
