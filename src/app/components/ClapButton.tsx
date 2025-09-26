"use client";
import { random, range } from 'lodash';
import { useState } from 'react';


export default function ClapButton() {

    const [clickCt , setClickCt] = useState(0);

    const handleClick = () => {
        if(clickCt > 6){
             removeClaps(); return;
        }
        
        setClickCt(clickCt + 1);
       const background = document.querySelector('.background');
       if(!background) return;

        range(10).forEach(() => {
           const clap = document.createElement('div');
           clap.classList.add('clap');
           clap.innerHTML = "👏";
           clap.style.left = random(0, 100) + '%';
           clap.style.top = random(0, 100) + '%';
           background.appendChild(clap);
       });

    };

    const removeClaps = () => {
        const claps = document.querySelectorAll('.clap');
        claps.forEach(clap => {
            clap.remove();
        });
        setClickCt(0);
    }

    return (
        <>
        <button onClick={handleClick} className="bg-brand1 text-white p-2 rounded-full shadow-lg hover:bg-brand2">
            <h1>👏</h1>
        </button>
        </>
    );
}
