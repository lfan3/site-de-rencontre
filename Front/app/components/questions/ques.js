var machatdata1 = [];
var machatdata2 = {};




class Person{
    constructor(ques, answers, index, diff){
        this.ques = ques;
        this.answers = answers;
        this.index = index;
        this.diff = diff;
    }
    partClassDiv(rootDiv){
        //var partDiv = `div**class=part${this.diff}**id=part${this.diff}${this.index}`.crea(rootDiv);
        var partDiv = ("div**class=part" + this.diff + "**id=part"+this.diff + this.index).crea(rootDiv);
        return partDiv;
    }
    
    fillPart(partDiv){
        var quesDiv = "div**class=questions".crea(partDiv);
        quesDiv.textContent = this.ques;
        var opDiv = "div**class=options".crea(partDiv);
        this.answers.forEach((answer)=>{
            var answerbutton = `div**class=answerbutton${this.diff}${this.index} ab`.crea(opDiv);
            answerbutton.textContent = answer;
        })
        return partDiv;
    }
}


class PersonA extends Person {
    constructor(ques, answers, index, diff){
        super();
        this.ques = ques;
        this.answers = answers;
        this.index = index;
        this.diff = diff;
    }
    answerbuttonEvent(answerbuttons){
        let abs = Array.from(answerbuttons);    
        abs.forEach((answerbutton)=>{
            answerbutton.addEventListener('click', ()=>{
                    let optionDiv = answerbutton.parentElement;
                    for(var i =0; i<optionDiv.children.length; i++){
                        optionDiv.children[i].classList.remove("checked");
                        optionDiv.children[i].style.backgroundColor = "white";
                        optionDiv.children[i].tog = undefined;
                    }
                    if(answerbutton.tog == undefined)
                    {
                        answerbutton.tog = true;
                        answerbutton.classList.add("checked");
                    }   
                    let checked = answerbutton.classList.contains('checked');
                    if(checked){
                        answerbutton.style.backgroundColor = 'green';
                    } 
            })
        })
    }
    addSubmit(partDiv,hideE,showE, answerbuttons){   
        var submit = "button**class=submit".crea(partDiv);
        submit.textContent = "Submit";
    
        submit.addEventListener('click', (e)=>{
            let k = 0;
            let abs = Array.from(answerbuttons);    
            abs.forEach((answerbutton)=>{
                if(answerbutton.classList.contains('checked')){
                    machatdata1.push(answerbutton.textContent.trim());
                    k++;
                }
            }) 
            if(k != 0){
                hideE.style.display = "none";
                showE.style.display = "block";
            //    console.log("m1 " + machatdata1);
            }  
        })
        return submit;
    }   
}

class PersonB extends PersonA{
    constructor(ques, answers, index, diff){
        super();
        this.ques = ques;
        this.answers = answers;
        this.index = index;
        this.diff = diff;
    }
    answerbuttonEvent(answerbuttons){
        let abs = Array.from(answerbuttons);    
        abs.forEach((answerbutton)=>{
            answerbutton.addEventListener('click', ()=>{
                answerbutton.classList.toggle('checked');
                let checked = answerbutton.classList.contains('checked');
                checked ? answerbutton.style.backgroundColor = 'green': answerbutton.style.backgroundColor = 'white';    
            })
        })
    }
    addSubmit(partDiv,hideE,showE, answerbuttons){   
        var submit = "button**class=submit".crea(partDiv);
        submit.textContent = "Submit";
    
        submit.addEventListener('click', (e)=>{
            let k = 0;
            let abs = Array.from(answerbuttons);    
            abs.forEach((answerbutton)=>{
                if(answerbutton.classList.contains('checked')){
                    k++;
                    if(machatdata2[this.index] == undefined)
                        machatdata2[this.index] = [];
                    machatdata2[this.index].push(answerbutton.textContent.trim());
                }
            }) 
            if(k != 0){
                hideE.style.display = "none";
                showE.style.display = "block";
            }  
        })
    
        return submit;
    }
    lastQSubmit(partDiv, answerbuttons){
        var submit = "button**class=submit".crea(partDiv);
        submit.textContent = "Submit";
        submit.addEventListener('click', (e)=>{
            let k = 0;
            let abs = Array.from(answerbuttons);    
            abs.forEach((answerbutton)=>{
                if(answerbutton.classList.contains('checked')){
                    k++;
                    if(machatdata2[this.index] == undefined)
                        machatdata2[this.index] = [];
                    machatdata2[this.index].push(answerbutton.textContent.trim());
                }
            }) 
            if( k!= 0){
                console.log(machatdata1);
                for (let [key, value] of Object.entries(machatdata2)){
                    console.log(`${key}: ${value}`);
                }

            }
        })
        return submit;
    }

}


function fill_questions(){
    var QA = {};
    var QB = {};
    var PartDivA = {};
    var PartDivB = {};
    var root = byId('root');
    var answerButtonsA = {};
    var answerButtonsB = {};
    for (var i=0; i<10; i++){
        QA[i] = new PersonA(PA[i]['question'], PA[i]['options'], i, 'A');
        PartDivA[i] = QA[i].partClassDiv(root); 
        QA[i].fillPart(PartDivA[i]);
        QB[i] = new PersonB(PB[0]['question'], PB[0]['options'], i, 'B');
        PartDivB[i] = QB[i].partClassDiv(root); 
        QB[i].fillPart(PartDivB[i]);            
        answerButtonsA[i] = byClass('answerbuttonA' + i);
        answerButtonsB[i] = byClass('answerbuttonB' + i);
        QA[i].answerbuttonEvent(answerButtonsA[i]);
        QB[i].answerbuttonEvent(answerButtonsB[i]);
    }
    for (var i=0; i<10; i++){ 
        if(i == 9){
            QA[i].addSubmit(PartDivA[i], PartDivA[i], PartDivB[i],answerButtonsA[i]);
            QB[i].lastQSubmit(PartDivB[i], answerButtonsB[i]);
        }
        else{
            QA[i].addSubmit(PartDivA[i], PartDivA[i], PartDivB[i],answerButtonsA[i]);
            QB[i].addSubmit(PartDivB[i], PartDivB[i], PartDivA[i+1],answerButtonsB[i]);
            console.log(i);
        }
    }
}

fill_questions();

