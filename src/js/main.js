const lift= document.getElementById('lift1');
const callBtn= document.querySelectorAll('button');

function moveLift(el){
  switch(el.id){
    case 'floor3':
    lift.style.bottom='70%';
    break;
    case 'floor2':
    lift.style.bottom='50%';
    break;
    case 'floor1':
    lift.style.bottom='30%';
    break;
    default:
    lift.style.bottom='10%';
  }
}



callBtn.forEach(btn=> btn.addEventListener('click',(e)=>{
  moveLift(e.target);
}))