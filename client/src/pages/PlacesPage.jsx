import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";

export default function PlacesPage() {

    const {action } = useParams();
    const [title, setTitle] = useState(''),
        [address, setAddress] = useState(''),
        [addedPhotos, setAddedPhotos] = useState([]),
        [photoLink, setPhotoLink] = useState(''),
        [description, setDescription] = useState(''),
        [perks, setPerks] = useState([]),
        [extraInfo, setExtraInfo] = useState(''),
        [checkIn, setCheckIn] = useState(''),
        [checkOut, setCheckOut] = useState(''),
        [maxGuests, setMaxGuests] = useState(1);

    function inputHeader(text){
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }
    function inputDescription(text){
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }
    function preInput(header, description){
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }
    async function addPhotoByLink(e){
        e.preventDefault();
        const {data:filename} = await axios.post('/upload-by-link', {
            link: photoLink
        })

        setAddedPhotos( prev => {
            return [...prev, filename]
        });
        setPhotoLink('');
    }

    function uploadPhoto(e){
        const files = e.target.files;
        const data = new FormData();
        for(let i = 0;i<files.length; i++){
            data.append('photos', files[i]);
        }

        axios.post('/upload', data, {
            headers: {'Content-Type' : 'multipart/form-data'}
        }).then(response => {
            const {data:filenames} = response;  
            setAddedPhotos( prev => {
                return [...prev, ...filenames]
            });
        })
    }


    return (
        <div>
            {action !== 'new' && (
            <div className="text-center">
                <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new place
                </Link>
            </div>
            )}
            {action === 'new' && (
                <div>
                    <form>
                        {preInput('Title', 'Title for your place. should be short and catchy as in advertisement')}
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="example: My lovely apt" />
                        
                        {preInput('Address', 'Address to this place')}
                        <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="address"/>
                        
                        {preInput('Photos', 'Customer prefer to see more photos')}
                        <div className="flex gap-2">
                            <input type="text" value={photoLink} onChange={e => setPhotoLink(e.target.value)} placeholder="add using a link (.jpg)"/>
                            <button onClick={addPhotoByLink} className="bg-gray-200 w-40 rounded-xl">Add photos</button>
                        </div>
                        
                        <div className="grid gap-3 grid-cols-3 md:grid-cold-4 lg:grid-cols-6 mt-2">
                            {addedPhotos.length > 0 && addedPhotos.map(link => (
                                <div>
                                    <img className="rounded-xl" src={'http://localhost:4000/uploads/' + link} alt="" />
                                </div>
                            ))}
                            <label className="cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-xl text-xl text-gray-500">
                                <input type="file" multiple className="hidden" onChange={uploadPhoto}/>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                </svg>
                                Upload
                            </label>
                        </div>
 
                        {preInput('Description', 'Description of the place')}
                        <textarea value={description} onChange={e => setDescription(e.target.value)} />
                        

                        {preInput('Perks', 'Select all the perks')}
                        <Perks 
                            selected={perks}
                            onChange={setPerks}
                        />

                        {preInput('Extra info', 'Example: house rules')}
                        <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)} />
                      
                        {preInput('Check in & out times', 'Add check in and check out time')}
                        <div className="grid gap-4 sm:grid-cols-3">
                            <div>
                                <h3 className="mt-2 -mb-1">Check in time</h3>
                                <input type="text" value={checkIn} onChange={e => setCheckIn(e.target.value)} placeholder="14"/>
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Check out time</h3>
                                <input type="text" value={checkOut} onChange={e => setCheckOut(e.target.value)} placeholder="11"/>
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Maximum no. of guests</h3>
                                <input type="text" value={maxGuests} onChange={e => setMaxGuests(e.target.value)} />
                            </div>
                        </div>

                        <button className="primary my-4">Save</button>
                    </form>
                </div>
            )}
        </div>
    )
}