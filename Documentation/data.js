var Sequelize = require('sequelize');

/*************** data *************/

var sequelize = new Sequelize('mat1', 'root', 'roooot', {
    host: "localhost",
    dialect: 'mysql',
    port: '5555',
    define:{
        timestamps : false
    },
    pool: {
        max:10,
        min:0,
        idle:100
    },
})

let Staff = sequelize.define('staff', {
    name : Sequelize.STRING
})

let Task = sequelize.define('task', {
    description : Sequelize.STRING
})

let mytasks1 = [
    { description: 'write memo' }, { description: 'check accounts' }
];

let mytasks2 = [
    { description: 'make two phone calls' },
    { description: 'read new emails' },
    { description: 'arrange meeting' }
];

Staff.hasMany(Task, {
    onDelete : 'CASCADE'
});
Task.belongsTo(Staff);

async function createTables(){
    await Staff.sync();
    await Task.sync();
    console.log('done');
}

createTables();

async function addUsersTasks(){
    let staff1 = await Staff.create({name : 'Joh David'});
    let tasks1 = await Task.bulkCreate(mytasks1);
    await staff1.setTasks(tasks1);

    let staff2 = await Staff.create({name : 'Linda Jee'});
    let tasks2 = await Task.bulkCreate(mytasks2);
    await staff2.setTasks(tasks2);
}

addUsersTasks();

/***DISTANCE CALCULATION */
async function showDistance(){
    let user1 = await Users.findOne({
        where : {id : 1},
    })
    let user2 = await Users.findOne({
        where : {id : 2},
    })
    var x1 = user1.location.coordinates[0]
    var y1 = user1.location.coordinates[1]
    var x2 = user2.location.coordinates[0]
    var y2 = user2.location.coordinates[1]
    //await db.query(`SET @pt1 = ST_GeomFromText('POINT(0 0)')`)
    //await db.query(`SET @pt2 = ST_GeomFromText('POINT(180 0)');`);
    await db.query(`SET @pt1 = ST_GeomFromText('POINT(${x1} ${y1})')`)
    await db.query(`SET @pt2 = ST_GeomFromText('POINT(28.553298 ${y2})')`)
    db.query('SELECT ST_Distance_Sphere(@pt1,@pt2) AS distance', {type: db.QueryTypes.SELECT})
    .then((res)=>{
        //ids.forEach((id)=>{
            console.log(res[0].distance)
        //})
    })
}

showDistance();
/*
async function showStaffsTasks(){
    let tasks = await Task.findAll({include : [Staff]});
    tasks.forEach((task)=>{
        let staff = task.staff.name;
        console.log(`${task.description} below to ${staff}`);
    })
    sequelize.close();
}
showStaffsTasks();

async function showStaffsTasks(){
    let staffs = await Staff.findAll({include : [Task]});
    staffs.forEach((staff)=>{
        let tasks = staff.tasks;
        tasks.forEach((task)=>{
            console.log(`${staff.name} taks ${task.description}`);
        })
    })
    sequelize.close();
}
showStaffsTasks();

Staff.findAll({include: [Task]}).then((staffs)=>{
    staffs.forEach(staff => {
        let tasks = staff.tasks;
        tasks.forEach(task =>{
            console.log(`${staff.name} takes ${task.description}`);
        })
    });
})
*/


/*
let Employee = sequelize.define('employees', {
    name: Sequelize.STRING
});

let Project = sequelize.define('projects', {
    name: Sequelize.STRING
});

//Employee.belongsTo(Project);
Project.hasOne(Employee);

Employee.findAll({include: [Project]}).then(employees =>{
    employees.forEach(employee =>{
        console.log(`${employee.name} support ${employee.project.name}`);
    });
})

Project.findAll({include: [Employee]}).then(projects => {

    projects.forEach(project => {
        console.log(`${project.name} belongs to user ${project.employee.name}`);
    });
}).finally(() => {
    sequelize.close();
});

let employees = [
    { name: 'Jane Brown' }, { name: 'Lucia Benner' }, { name: 'Peter Novak' }
];

sequelize.sync({ force: true }).then(() => {
    return Employee.bulkCreate(employees);
}).then((employees) => {
    let works = [];
    let i = 0;
    employees.forEach(employee => {
        let pname = 'Project ' + String.fromCharCode('A'.charCodeAt() + i);
        i++;
        let work = Project.create({ name: pname }).then(project => {
            employee.setProject(project); //??? note quite understood
        });
        works.push(work);
        console.log(employee.get({plain : true}));
    });
    Promise.all(works).then(() => sequelize.close());
    console.log('finish');

});

let Note = sequelize.define('notes',{
    description: Sequelize.STRING
})

async function getRows() {
    let notes = await Note.findAll({
        //offset  : 2, 
        //limit   : 3, 
        order       : [['id', 'DESC']],
        attributes : ['id', 'description'],
        where       : { id : { [Sequelize.Op.between] : [3, 6]}},
        //where       : { id : { [Sequelize.Op.in]: [3, 6]}},
        raw     : true
    })
    console.log(notes);
    sequelize.close();
}
getRows();

async function findAllRows(){
    let notes = await Note.findAll({
        attribute : ['id', 'description'],
        raw : true
    });
    console.log(notes);
    sequelize.close();
}
findAllRows();

async function updateRow(){
    let id = await Note.update(
        {description : 'Finished reading novels'},
        { where : { id : 1}}
    );
    sequelize.close();
}
updateRow();

async function deletRow(){
    let n = await Note.destroy({ where : { id: 2}});
    console.log(`number of deleted rows : ${n}`);
}
deletRow();

async function countRow() {
    let n = await Note.count();
    console.log(`There are ${n} rows`);
}
countRow();

async function getOneNote() {
    let user = await Note.findOne();
    console.log(user.get('description'));
    sequelize.close();
}

getOneNote();

Note.findOne({ where: { id : 1}}).then(note=>{
    console.log(note.get({plain : true}));
})

Note.findByPk(2).then((note)=>{
    console.log(note.get({plain: true}));
    console.log('*****************************');
    console.log(`id: ${note.id}, description: ${note.description}`);
})

let notes = [
    { description: 'Tai chi in the morning' },
    { description: 'Visited friend' },
    { description: 'Went to cinema' },
    { description: 'Listened to music' },
    { description: 'Watched TV all day' },
    { description: 'Walked for a hour' }
]

let Dummy = sequelize.define('dummy', {
    description : Sequelize.STRING
})


sequelize.authenticate().then(()=>{
    console.log('Connection');
}).catch(err=>{
    console.error('err ', err);
})

let Dummy = sequelize.define('dummy', {
    description: Sequelize.STRING
})
*/
/*
Dummy.sync().then(()=>{
    console.log('dummy table created');
}).finally(()=>{
    sequelize.close();
})

sequelize.sync({force:true}).then(()=>{
    Dummy.create({description:'test 1'}).then(()=>{
        console.log('tab is created');
    })
})

sequelize.sync({ force: true}).then(()=>{
    Note.bulkCreate(notes, {validate: true}).then(()=>{
        console.log('notes created');
    }).catch((err)=>{
        console.log(err);
    });
})
//create() = build() + save()
const note = Note.build({description:'Took a cold bath'});
note.save().then(()=>{
    console.log('new task saved');
})

Dummy.drop().then(()=>{
    console.log('dummy is dropped');
})
*/

/*****roots setting ********
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('*', (req, res) => res.status(200).send({
message: 'Welcome to the beginning of nothingness.',
}));
const port = parseInt(process.env.PORT, 10) || 8800;
app.set('port', port);
app.listen(port)
module.exports = app;
*/