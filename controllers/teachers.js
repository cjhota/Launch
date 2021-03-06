const fs = require("fs");
const data = require("../data.json");
const { age, date, graduation } = require("../utils");

exports.index = function (req, res) {
  const teachers = data.teachers.map(function(teacher){
     return {
       ...teacher,
       services: teacher.services.split(",")
     }
      
  })

  // console.log(teachers)

  return res.render("teachers/index", {teachers});
},

exports.create =  function (req, res) {
  return res.render("teachers/create");
},

//post
exports.post = function (req, res) {
  const keys = Object.keys(req.body);

  for (key of keys) {
    //req.body.key ==""
    if (req.body[key] == "") {
      return res.send("Please, fill all fields");
    }
  }

  let { avatar_url, name, birth, education, typeofclass, services } = req.body;

  birth = Date.parse(birth);
  const created_at = Date.now();
  const id = Number(data.teachers.length + 1);

  data.teachers.push({
    id,
    avatar_url,
    name,
    birth,
    typeofclass,
    education,
    services,
    created_at,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("White file error!");

    return res.redirect("/teachers");
  });

  //   return res.send(req.body);
};

//show
exports.show = function (req, res) {
  //req.params
  const { id } = req.params;

  const foundTeacher = data.teachers.find(function (teacher) {
    return teacher.id == id;
  });

  if (!foundTeacher) return res.send("Teacher not found");

  const teacher = {
    ...foundTeacher,
    age: age(foundTeacher.birth),
    services: foundTeacher.services.split(","),
    created_at: new Intl.DateTimeFormat("pt-BR").format(
      foundTeacher.created_at
     ),
  };

  return res.render("teachers/show", { teacher });
};

//Edit
exports.edit = function (req, res) {
  const { id } = req.params;

  const foundTeacher = data.teachers.find(function (teacher) {
    return teacher.id == id;
  });

  if (!foundTeacher) return res.send("Teacher not found");

  const teacher = {
    ...foundTeacher,
    birth: date(foundTeacher.birth).iso
    // education: graduation(foundTeacher.education),
  };

  return res.render("teachers/edit", { teacher });
};

//put
exports.put = function (req, res) {
  const { id } = req.body;
  let index = 0;

  const foundTeacher = data.teachers.find(function (teacher, foundIndex) {
    // return teacher.id == id;
    if (id == teacher.id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundTeacher) return res.send("Teacher not found");

  const teacher = {
    ...foundTeacher,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id)
  };

  data.teachers[index] = teacher;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("White file error!");

    return res.redirect(`/teachers/${id}`);

    console.log(`/teachers/${id}`);
  });
};

//delete
exports.delete =  function(req, res) {
  const {id} = req.body 
  
  const filteredTeachers = data.teachers.filter(function(teacher){
    return teacher.id != id
  })

  data.teachers = filteredTeachers

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send("write file error!")

    return res.redirect("/teachers")
    // console.log(`/teachers/${id}`);

  })
}