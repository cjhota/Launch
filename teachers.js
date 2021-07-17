const fs = require("fs");
const data = require("./data.json");
const { age, date, graduation } = require("./utils");

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

//Create
exports.post = function (req, res) {
  const keys = Object.keys(req.body);

  for (key of keys) {
    //req.body.key ==""
    if (req.body[key] == "") {
      return res.send("Please, fill all fields");
    }
  }

  let { avatar_url, name, birth, select, typeofclass, services } = req.body;

  birth = Date.parse(birth);
  const created_at = Date.now();
  const id = Number(data.teachers.length + 1);

  data.teachers.push({
    id,
    avatar_url,
    name,
    birth,
    typeofclass,
    select,
    services,
    created_at,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("White file error!");

    return res.redirect("/teachers");
  });

  //   return res.send(req.body);
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
    birth: date(foundTeacher.birth),
    select: graduation(foundTeacher.select),
  };

  return res.render("teachers/edit", { teacher });
};

//updade

//delete
