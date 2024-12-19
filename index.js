const express = require('express');
const mongoose = require('mongoose');

let app = express();
app.use(express.json());

// Replace the placeholders with your actual MongoDB Atlas credentials
let connectDB = async function () {
    await mongoose.connect('mongodb+srv://Bosha:bosha1111@studentsys.18odl.mongodb.net/StudentSystem?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.log('Error connecting to MongoDB Atlas:', err));
};

connectDB();

app.get('/',(req,res) =>{
    res.send("Error 404")
})


const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    phone: { type: String, required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
});
let StudentModel = new mongoose.model("Student",studentSchema);


//Add studen
app.post('/Student', async (req, res) => {
    let NewStudent = new StudentModel({
        name: req.body.name,
        age: req.body.age,
        phone: req.body.phone,
        courseId: req.body.courseId
    });
    await NewStudent.save();
    res.status(201)
    res.json("Student has been created");
});

//Get One
app.get('/Student/:id', async (req, res) => {
    const StudentId = req.params.id;


    try {
        const Std_One = await StudentModel.findById(StudentId);
        if (!Std_One) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json(Std_One);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving Student", error: error.message });
    }
});

//Get All
app.get('/Student', async (req,res)=>{
    let AllStudents = await StudentModel.find();

    res.status(200) ;
    res.json(AllStudents)

})

// Delete
app.delete('/Student/:id', async (req, res) => {
    const StudentId = req.params.id;

    try {
        const DeletedStudent = await StudentModel.findByIdAndDelete(StudentId);
        if (!DeletedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json({ message: "Student has been deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting Student", error: error.message });
    }
});


// Update
app.put('/Student/:id', async (req, res) => {
    const StudentId = req.params.id;

    try {
        const updatedStudent = await StudentModel.findByIdAndUpdate(StudentId, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(500).json({ message: "Error updating Student", error: error.message });
    }
});






//Course
const CourseSchema  = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
});
let CourseModel   = new mongoose.model("Course",CourseSchema);


//Add Course
app.post('/Course', async (req, res) => {
    let NewCourse = new CourseModel({
        title: req.body.title,
        description: req.body.description,
    });
    await NewCourse.save();
    res.status(201)
    res.json("Course has been created");
});

//Get One
app.get('/Course/:id', async (req, res) => {
    const courseId = req.params.id;

    try {
        const Course_One = await CourseModel.findById(courseId);
        if (!Course_One) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json(Course_One);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving Course", error: error.message });
    }
});
//Get All
app.get('/Course', async (req,res)=>{
    let AllCourse = await CourseModel.find();

    res.status(200) ;
    res.json(AllCourse)

})

// Delete
app.delete('/Course/:id', async (req, res) => {
    const courseId = req.params.id;

    try {
        const DeletedCourse = await CourseModel.findByIdAndDelete(courseId);
        if (!DeletedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json({ message: "Course has been deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting Course", error: error.message });
    }
});

// Update
app.put('/Course/:id', async (req, res) => {
    const CourseId = req.params.id;

    try {
        const updatedCourse = await CourseModel.findByIdAndUpdate(CourseId, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({ message: "Error updating Course", error: error.message });
    }
});


app.listen(3000, () => console.log('server is opened'));
