import { HeaderH1, HeaderH2, Pretty, SimpleButton, SimpleFaq, SimpleImage, SimpleParagraph, Spacer } from "../../scaffolding/simple-elements";
import kuraczny from '../../assets/kuraczny.png';
import './home.css'

import { GrRobot, GrBook, GrArticle  } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";


export default function HomePage()
{

    const navigate = useNavigate();
    const {links} = useContext(AppContext);

    function goTo(where)
    {
        navigate(where);
    }

    return <main>
        <Spacer height_pc={100}/>
        {/* TOP */}
        <Pretty text={"Kurki polecają!"}/>
        <Spacer height_pc={20}/>
        <HeaderH1
            color={'var(--dark-green)'}
            text={"Wszystko o kurkach w jednym miejscu"}
            font_weight={800} pc_align="center"
            phone_aling="center"
            tablet_align="center"/>
        <Spacer height_pc={40}/>
        <div className="grid-2-1">
            <div>
                <SimpleParagraph pc_align="justify" tablet_align="justify" phone_aling="center" 
                    text="Miejsce to stworzyliśmy z myślą o wszystkich Kurzych Entuzjastach czyli o Was. Tutaj znajdziecie przestrzeń, w której możecie być sobą, dzielić się swoją ekspertyzą, pisać z innymi. Tutaj macie głos, tutaj Wasze kurki mają głos. 
                    Wegług niezależnych badań wszystkie kurki polecają!"/>
                <Spacer height_pc={20} />
                <SimpleParagraph pc_align="justify" tablet_align="justify" phone_aling="center"
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id nisl id dui ornare sollicitudin at eget eros. Nullam finibus, lectus ut feugiat vehicula, orci quam ultrices felis, nec cursus tellus est vitae ligula. Duis viverra nunc eget mauris accumsan malesuada. Nulla laoreet tempus justo, a tristique eros vestibulum in. Sed consectetur laoreet sem, pulvinar faucibus orci tristique sit amet. Integer ullamcorper tristique justo, id cursus odio varius ut. Aliquam ut turpis hendrerit, volutpat odio nec, imperdiet ante. Ut sollicitudin lectus sit amet ante luctus, eget imperdiet est posuere. Praesent sit amet massa et arcu vestibulum laoreet sed eu dolor."/>
            </div>
            

            <div className="home-image-space">
                <SimpleImage alt="kurki polecają" src={kuraczny}/>
            </div>
            
        </div>
        <Spacer height_pc={10} height_phone={30}/>
        <div className="buttons-space">
            <SimpleButton type="empty" onClick={()=>{goTo("/account")}}> Zobacz swoje konto </SimpleButton>
            <SimpleButton type="filled"> Dowiedz się więcej </SimpleButton>
        </div>
        <Spacer height_pc={150}/>
        
        
        {/* STEPS */}
        <Pretty text={"Bardzo proste!"}/>
        <Spacer height_pc={20}/>
        <HeaderH2
            color={'var(--dark-green)'}
            text={"To wszystko jest naprawdę proste"}
            font_weight={800} pc_align="center"
            phone_aling="center"
            tablet_align="center"
            font_size="var(--big)"/>
        <Spacer height_pc={24}/>
        <SimpleParagraph text="Wystrzczy tylko kilka kroków by pełnia naszej strony stanęła przed Tobą otworem" pc_align="center" tablet_align="center" phone_aling="center"/>
        <Spacer height_pc={60}/>
        <div className="steps">
            <div className="steps-item">
                <span> 1 </span>
                <div className="steps-item-content">
                    Wejdź na naszą piękną stronkę
                </div>
            </div>
            <div className="steps-item-line"></div>

            <div className="steps-item">
                <span> 2 </span>
                <div className="steps-item-content">
                    Stwórz konto
                </div>
            </div>
            <div className="steps-item-line"></div>

            <div className="steps-item">
                <span> 3 </span>
                <div className="steps-item-content">
                    Zaloguj się
                </div>
            </div>
            <div className="steps-item-line"></div>

            <div className="steps-item">
                <span> 4 </span>
                <div className="steps-item-content">
                    I pełnia możliwości jest już Twoja
                </div>
            </div>
        </div>
        <Spacer height_pc={10} height_phone={30}/>
        <div className="buttons-space">
            <SimpleButton type="filled"> Rozpocznij </SimpleButton>
        </div>
        <Spacer height_pc={150}/>


        {/* Functionality */}
        <Pretty text={"Wiele możliwości!"}/>
        <Spacer height_pc={20}/>
        <HeaderH2 
            color={'var(--dark-green)'}
            text={"Zobacz co dla Ciebie przygotowaliśmy!"}
            font_weight={800} pc_align="center"
            phone_aling="center"
            tablet_align="center"
            font_size="var(--big)"/>
        <Spacer height_pc={24}/>
        <SimpleParagraph text="Odkryj możliwości naszej wspaniałej strony" pc_align="center" tablet_align="center" phone_aling="center"/>
        <Spacer height_pc={40}/>
        <div className="tiles">
            <div className="tile">
                <HeaderH2 text={"Forum użytkowników"}/>
                <Spacer height_pc={2}/>
                <span><GrArticle/></span>
                <Spacer height_pc={10}/>
                <SimpleParagraph text="Wejdź na forum użytkowników. Dodawaj posty, przeglądaj posty innych użytkowników, dziel się swoją wiedzą o kurkach i zderzaj swoje kurze poglądy z innymi." 
                    pc_align="justify" phone_aling="justify" tablet_align="justify"/>
                <div style={{flexGrow: 1}}></div>
                <SimpleButton onClick={()=>{goTo(links.forum.link)}}> Zobacz forum</SimpleButton>
                <Spacer height_pc={5}/>
            </div>

            <div className="tile">
                <HeaderH2 text={"Kurza Encyklopedia"}/>
                <Spacer height_pc={2}/>
                <span><GrBook/></span>
                <Spacer height_pc={10}/>
                <SimpleParagraph text="Zajrzyj do naszej kurzej encyklopedii. Znajdziesz tam ciekawe informacje o różnych rasach kur!" 
                    pc_align="justify" tablet_align="justify" phone_aling="justify"/>
                <div style={{flexGrow: 1}}></div>
                <SimpleButton onClick={()=>{goTo(links.encyclopedy.link)}}> Zobacz encyklopedię</SimpleButton>
                <Spacer height_pc={5}/>
            </div>
            

            <div className="tile">
                <HeaderH2 font_weight={500} text={"KurkAI"}/>
                <Spacer height_pc={2}/>
                <span><GrRobot/></span>
                <Spacer height_pc={10}/>
                <SimpleParagraph text=" Stawiamy na nowocześność! Kurki są teraz AI-powered! Dołączyliśmy do naszej strony najnowszego niesamowitego kurzego chatBota. Niekończące się godziny rozmów na wszelkie tematy kurze wraz z naszą Sztuczną Inteligencją. Poznaj KurkAIa i pełnię jego możliwości." 
                    pc_align="justify" tablet_align="justify" phone_aling="justify"/>
                <div style={{flexGrow: 1}}></div>
                <SimpleButton onClick={()=>{goTo(links.kurkAI.link)}}> Otwórz KurkAIa</SimpleButton>
                <Spacer height_pc={5}/>
            </div>
        </div>
        <Spacer height_pc={24}/>
        <SimpleParagraph text="Wzbudziliśmy Twoją ciekawość? Poznaj nasz zespół!" pc_align="center" tablet_align="center" phone_aling="center"/>
        <Spacer height_pc={10}/>
        <div className="buttons-space">
            <SimpleButton type="filled" onClick={()=>{goTo(links.about_us.link)}}> Poznaj twórców tej strony </SimpleButton>
        </div>
        <Spacer height_pc={150}/>

        {/* FAQ */}
        <HeaderH2 
            color={'var(--dark-green)'}
            text={"Najczęstsze pytania"}
            font_weight={800} pc_align="center"
            phone_aling="center"
            tablet_align="center"
            font_size="var(--big)"/>
        <Spacer height_pc={24}/>
        <SimpleFaq title="Jak można dodać wpis na forum?">
            <SimpleParagraph pc_align="justify" tablet_align="justify" phone_aling="justify"
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id nisl id dui ornare sollicitudin at eget eros. Nullam finibus, lectus ut feugiat vehicula, orci quam ultrices felis, nec cursus tellus est vitae ligula. Duis viverra nunc eget mauris accumsan malesuada. Nulla laoreet tempus justo, a tristique eros vestibulum in. Sed consectetur laoreet sem, pulvinar faucibus orci tristique sit amet. Integer ullamcorper tristique justo, id cursus odio varius ut. Aliquam ut turpis hendrerit, volutpat odio nec, imperdiet ante. Ut sollicitudin lectus sit amet ante luctus, eget imperdiet est posuere. Praesent sit amet massa et arcu vestibulum laoreet sed eu dolor."/>
        </SimpleFaq>
        <Spacer height_pc={10}/>
        <SimpleFaq title="Gdzie mogę założyć konto?">
            <SimpleParagraph pc_align="justify" tablet_align="justify" phone_aling="justify"
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id nisl id dui ornare sollicitudin at eget eros. Nullam finibus, lectus ut feugiat vehicula, orci quam ultrices felis, nec cursus tellus est vitae ligula. Duis viverra nunc eget mauris accumsan malesuada. Nulla laoreet tempus justo, a tristique eros vestibulum in. Sed consectetur laoreet sem, pulvinar faucibus orci tristique sit amet. Integer ullamcorper tristique justo, id cursus odio varius ut. Aliquam ut turpis hendrerit, volutpat odio nec, imperdiet ante. Ut sollicitudin lectus sit amet ante luctus, eget imperdiet est posuere. Praesent sit amet massa et arcu vestibulum laoreet sed eu dolor."/>
        </SimpleFaq>
        <Spacer height_pc={10}/>
        <SimpleFaq title="Jak uruchomić KurkAIa?">
            <SimpleParagraph pc_align="justify" tablet_align="justify" phone_aling="justify"
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id nisl id dui ornare sollicitudin at eget eros. Nullam finibus, lectus ut feugiat vehicula, orci quam ultrices felis, nec cursus tellus est vitae ligula. Duis viverra nunc eget mauris accumsan malesuada. Nulla laoreet tempus justo, a tristique eros vestibulum in. Sed consectetur laoreet sem, pulvinar faucibus orci tristique sit amet. Integer ullamcorper tristique justo, id cursus odio varius ut. Aliquam ut turpis hendrerit, volutpat odio nec, imperdiet ante. Ut sollicitudin lectus sit amet ante luctus, eget imperdiet est posuere. Praesent sit amet massa et arcu vestibulum laoreet sed eu dolor."/>
        </SimpleFaq>
        <Spacer height_pc={10}/>
        <SimpleFaq title="Co ma w sobie KurkAI?">
            <SimpleParagraph pc_align="justify" tablet_align="justify" phone_aling="justify"
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id nisl id dui ornare sollicitudin at eget eros. Nullam finibus, lectus ut feugiat vehicula, orci quam ultrices felis, nec cursus tellus est vitae ligula. Duis viverra nunc eget mauris accumsan malesuada. Nulla laoreet tempus justo, a tristique eros vestibulum in. Sed consectetur laoreet sem, pulvinar faucibus orci tristique sit amet. Integer ullamcorper tristique justo, id cursus odio varius ut. Aliquam ut turpis hendrerit, volutpat odio nec, imperdiet ante. Ut sollicitudin lectus sit amet ante luctus, eget imperdiet est posuere. Praesent sit amet massa et arcu vestibulum laoreet sed eu dolor."/>
        </SimpleFaq>
        <Spacer height_pc={10}/>
        <SimpleFaq title="Wyświetla mi się, że mój email jest zajęty, czemu?">
            <SimpleParagraph pc_align="justify" tablet_align="justify" phone_aling="justify"
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id nisl id dui ornare sollicitudin at eget eros. Nullam finibus, lectus ut feugiat vehicula, orci quam ultrices felis, nec cursus tellus est vitae ligula. Duis viverra nunc eget mauris accumsan malesuada. Nulla laoreet tempus justo, a tristique eros vestibulum in. Sed consectetur laoreet sem, pulvinar faucibus orci tristique sit amet. Integer ullamcorper tristique justo, id cursus odio varius ut. Aliquam ut turpis hendrerit, volutpat odio nec, imperdiet ante. Ut sollicitudin lectus sit amet ante luctus, eget imperdiet est posuere. Praesent sit amet massa et arcu vestibulum laoreet sed eu dolor."/>
        </SimpleFaq>

        <Spacer height_pc={220}/>
    </main>
}