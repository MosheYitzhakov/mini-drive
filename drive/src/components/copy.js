import axios from 'axios';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';


export const Copy = ({ setItems, name }) => {
    const { pathname } = useLocation();
    const [neww, setNew] = useState('');
    // const [select, setSelect] = useState('file');
    const [p, setP] = useState();

    const newFile = async (e) => {
        let newName = neww;
        if (neww.length < 4) {
            e.preventDefault()
            return setP("name is short")
        }

        let DotNeww = neww.substring(neww.length - 4).includes('.')
        let DotName = name.substring(neww.length - 4).includes('.')
        if (!(DotName === DotNeww)) {
            if (DotName) {
                DotName = name.split('.')

                newName += `.${DotName[1]}`
            } else {
                DotNeww = neww.split('.')
                newName = DotNeww[0]
            }

        }

        console.log(pathname === '/');
        axios.put("http://localhost:3333" + pathname + name, {
            name: newName,
            command: 'copy'
        }).then((data) => {
            console.log(data);
            console.log(`copy ${newName}`)
            setItems([false, false])
        }
        ).catch(e => {
            console.error(e)
        })
        
    }

    return (
        <>
            <h3>new name to copy</h3>
            {/* <form> */}
                <input type="text" value={neww} onChange={e => { setNew(e.target.value) }} />
                <br />
                <button onClick={(e) => newFile(e)} >add</button>
                <br />

                {<p>{p}</p>}
            {/* </form> */}
        </>

    )
}