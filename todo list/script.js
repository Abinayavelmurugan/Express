const todolist=[{
    name:'dinner',
    duedate:'2022-02-22'
}];
let todohtml=''
   

todolist.forEach( function(todoobj,index){
   
        const name=todoobj.name;
        const date=todoobj.duedate;
        //we can use destructing 
        //const {name}=todoobj'
        const html=`<div>${name}</div>
        <div>${date}</div> 
        <button onclick="
            todolist.splice(${i},1);
            render();" 
       class="delete" >Delete</button>`;
        todohtml+=html;
    
    console.log(todohtml);
    document.querySelector('.displaytasks').innerHTML=todohtml;
})
function render(){
    let todohtml=''
    for(let i=0;i<todolist.length;i++){
        const todoobj=todolist[i];
        const name=todoobj.name;
        const date=todoobj.duedate;
        //we can use destructing 
        //const {name}=todoobj'
        const html=`<div>${name}</div>
        <div>${date}</div> 
        <button 
       class="delete" >Delete</button>`;
        todohtml+=html;
    }
    console.log(todohtml);
    document.querySelector('.displaytasks').innerHTML=todohtml;
    
    
}
document.querySelector('add').addEventListener('click',()=>{
    addTasks();
});
document.querySelectorAll('delete').forEach((d,index)=>{
    d.addEventListener('click',()=>{
        todolist.splice(index,1);
        render();
    });

});
function addTasks(){
const inputt=document.querySelector('.js-input');
const name=inputt.value;
const dateinput=document.querySelector('.js-date');
const datevalue=dateinput.value;
todolist.push({
    name,
    duedate:datevalue
});
//console.log(todolist);

//splice is used to delete the element in the array



inputt.value='';
dateinput.value='';
render();
}