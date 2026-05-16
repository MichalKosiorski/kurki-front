import "./ThemeFooter.css"
import trawka from "../assets/trawka.png"
import kur from "../assets/kur_filled.png"
import { HeaderH2, SimpleLink, SimpleParagraph, Spacer } from "../scaffolding/simple-elements"
import React, { useContext, useEffect, useRef, useState } from "react"
import { SlSocialFacebook, SlSocialInstagram, SlSocialYoutube, SlSocialReddit, SlPin} from "react-icons/sl";
import { useNavigate } from "react-router-dom"


import { SlPhone, SlLocationPin, SlEnvolope} from "react-icons/sl";
import { AppContext } from "../contexts/AppContext"


export function ThemeFooter({}){

    const grass_ref = useRef();
    const [left, setLeft] = useState(20);
    const [direction, setDirection] = useState(0);
    const [animation, setAnimation] = useState('walking');
    
    //chicken variables
    const chicken_walking_counter = useRef();
    const chicken_walking_counter_max = useRef();
    const current_acion = useRef();
    const current_left = useRef();
    const ref_direction = useRef();
    const timeoutRef = useRef(null); // timeout id

    //walking params
    const walking_animation_duration = 3000; //this is duration of one wwalking cycle
    const width_of_chicken = 120; //this is width of chicken sprite
    const chicken_offset = 20; //this is how many pixlels from left and right chicken can not cross
    const chicken_walkable_distance = 200; //this is how many pixels chicken walks in one cycle
    const check_grass_refresh_duration = 200; //this is duration of refresh of checking if grass is set, due to the fact that grass - 
    //- appears later than function 
    const walking_probability = 60; //this is how big is chance of chicken to choose walking instead of eating, 90 -> 90% chance of walking,
    //10% chance of eating, if grater than 99 then always walk
    const eating_animation_duratoin = 1800;

    const {links} = useContext(AppContext);


    const navigation_links = [
        {name: links.main.name, link: links.main.link},
        {name: links.forum.name, link: links.forum.link},
        {name: links.encyclopedy.name, link: links.encyclopedy.link},
        {name: links.contact.name, link: links.contact.link},
        {name: links.about_us.name, link: links.about_us.link},
        {name: links.privacy_policy.name, link: links.privacy_policy.link},
        {name: links.statute.name, link: links.statute.link},
    ]

    /*main chicken function:
    - decide action - walking or eating
    - sets all params
    - sets animations
    */ 
    function chickenLogic()
    {

        //grass needs to be set
        if(!grass_ref.current){
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(chickenLogic, check_grass_refresh_duration);
            return;
        }

        //checking if its time to new action
        if(chicken_walking_counter.current >= chicken_walking_counter_max.current)
        {
            setAnimation('walking');
            //random number between 1 and 100
            const randomNumber = Math.floor(Math.random() * 100) + 1;
            
            if(randomNumber <= walking_probability)
            {
                current_acion.current = 'walking';
                chicken_walking_counter.current = 0;
                chicken_walking_counter_max.current = 0;

                //deciding how far we can walk
                let width = grass_ref.current.offsetWidth - width_of_chicken - chicken_offset;
                
                if(current_left.current < (chicken_walkable_distance + chicken_offset)) //we can go only to right
                {
                    prepareChickenRight();
                }
                else if(current_left.current > width - chicken_walkable_distance) //we have to go left
                {
                    prepareChickenLeft();
                }
                else // we can decide direction
                {
                    const new_direction = Math.floor(Math.random() * 2) + 1;

                    if(new_direction == 1)
                        prepareChickenLeft();
                    else
                        prepareChickenRight();
                }
            }
            else
            {
                current_acion.current = 'eating';
                setAnimation('eating');
                clearTimeout(timeoutRef.current);
                timeoutRef.current = setTimeout(chickenLogic, eating_animation_duratoin);
                return;
            }
        }
        else
        {
            if(current_acion.current == 'eating')
                return;

            let mod = 1;
            if(ref_direction.current)
                mod = -1;
            //we walk
            setLeft(prev => prev + mod * chicken_walkable_distance);
            chicken_walking_counter.current++;
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(chickenLogic, walking_animation_duration);
            return;
        }
    }

    /*
    - prepares chicken do go left
    - decides how far it can go etc. 
    */
    function prepareChickenLeft()
    {
        //deciding how far we can walk
        let width = grass_ref.current.offsetWidth - width_of_chicken - chicken_offset;


        let distance = chicken_walkable_distance;
        if(current_left.current - chicken_walkable_distance * 3 >= chicken_offset){
            chicken_walking_counter_max.current = 3;
        }
        else if(current_left.current - chicken_walkable_distance*2 >= chicken_offset){
            chicken_walking_counter_max.current = 2;
        }
        else
        {
            chicken_walking_counter_max.current = 1;
            if(current_left.current - chicken_walkable_distance <= chicken_offset)
                distance = current_left.current - chicken_offset;
            }

        //we walk
        setDirection(1);
        ref_direction.current = 1;
        setLeft(prev => prev - distance);
        chicken_walking_counter.current++;
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(chickenLogic, walking_animation_duration);
        return;
    }

    function prepareChickenRight()
    {

        //deciding how far we can walk
        let width = grass_ref.current.offsetWidth - width_of_chicken - chicken_offset;

        setDirection(0);
        let distance = chicken_walkable_distance;
        ref_direction.current = 0;
        
        //how far??
        let max_right = width - current_left.current;
        if(chicken_walkable_distance * 3 < max_right){
            chicken_walking_counter_max.current = 3;
        }
        else if(chicken_walkable_distance*2  < max_right){
            chicken_walking_counter_max.current = 2;
        }
        else
        {
            chicken_walking_counter_max.current = 1;
            if(chicken_walkable_distance > max_right)
                distance = max_right - chicken_offset;
                        
        }

        //we walk
        setDirection(0);
        ref_direction.current = 0;
        setLeft(prev => prev + distance);
        chicken_walking_counter.current++;
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(chickenLogic, walking_animation_duration);
        return;
    }

    //starting chicken
    useEffect(()=>{

        current_left.current = chicken_offset;
        chicken_walking_counter.current = 0;
        chicken_walking_counter_max.current = 0;
        current_acion.current = 'walking';
        ref_direction.current = 0;

        chickenLogic();
    }, [])

    useEffect(()=>{
        current_left.current = left;
    },[left])
    

    function goToFantasticPage()
    {
        window.open("https://www.facebook.com/fullsportlublin", "_blank", "noopener,noreferrer");
    }

    function goToHeadQuarters()
    {
        window.open("https://maps.app.goo.gl/24foYZrCLiVqXHqQA", "_blank", "noopener,noreferrer");
        
    }

    return (
    
    <footer className="theme-footer" ref={grass_ref}>
        <div className="theme-footer-grass"></div>
        <div className={`theme-footer-chicken 
            ${animation == 'eating' ? direction ? "theme-footer-chicken-left-"+animation : "theme-footer-chicken-right-"+animation :"theme-footer-chicken-"+animation} 
            ${direction ? 'theme-footer-chicken-rotated' : ''}`}
            style={{left: left+"px"}} 
        >
            <img src={kur} alt="chodzi sobie kurczaczek"/>
        </div>
        <Spacer height_pc={50} height_phone={50} height_tablet={50}/>
        <div className="theme-footer-body">
            <div className="theme-footer-body-left">
                <HeaderH2 text={"FORUM KURZYCH ENTUZJASTÓW"} color={"var(--dark-green)"} font_weight={600} />
                <Spacer height_pc={15}/>
                <SimpleParagraph pc_align="justify" phone_aling="center" tablet_align="justify" add_class={"flex-grow"}
                    text="Działamy dla Was i z myślą o Was!"/>
                <Spacer height_pc={15}/>
                <div className="theme-footer-icons">
                    <SlSocialFacebook onClick={goToFantasticPage} tabIndex={0}/>
                    <SlSocialInstagram onClick={goToFantasticPage} tabIndex={0}/>
                    <SlSocialYoutube onClick={goToFantasticPage} tabIndex={0}/>
                    <SlSocialReddit onClick={goToFantasticPage} tabIndex={0}/>
                </div>
                <Spacer height_pc={15}/>
                <div className="theme-footer-copy">
                    <span style={{fontWeight: 600}}> &copy;FEK {new Date().getFullYear()}</span>
                    &nbsp;Wszystkie prawa zastrzeżone
                </div>
            </div>
            <div className="theme-footer-navigation">
                <div style={{
                    fontSize: "var(--medium-minus)",
                    fontWeight: "600",
                }}>
                    Nawigacja: 
                </div>
                <Spacer height_pc={20}/>
                {navigation_links.map((item, index)=>(
                    <div className="navigation-item" key={index}>
                        <SimpleLink text={item.name} link={item.link}/>  
                        <Spacer height_pc={10}/>   
                    </div>
                ))}
            </div>

            <div className="theme-footer-contact">
                <div style={{
                    fontSize: "var(--medium-minus)",
                    fontWeight: "600",
                }}>
                    Kontakt: 
                </div>
                <Spacer height_pc={20}/>
                <div className="theme-footer-contact-entry">
                    <SlPhone/>
                    <span>692137420</span>
                </div>
                <Spacer height_pc={15}/>
                <div className="theme-footer-contact-entry">
                    <SlEnvolope/>
                    <span> kontakt@fek.org</span>
                </div>
                <Spacer height_pc={15}/>
                <div className="theme-footer-contact-entry">
                    <SlPin/>
                    <span className="theme-footer-contact-entry-link" tabIndex={0} onClick={goToHeadQuarters}>27-370 Warszawa, Kurzy Entuzjaści HeadQuarters, ul. Jajeczna 17/4 </span>
                </div>
                
            </div>
            
        </div>
    </footer>)
}