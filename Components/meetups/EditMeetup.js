import Dialog from "@mui/material/Dialog";
import { useRef } from "react";
import { Card } from "@mui/material";
import classes from "./NewMeetupForm.module.css";
import { useRouter } from "next/router";

export default function FormDialog({ handleClose, open, meetup, setMeetup, setOpen }) {    
    const router = useRouter();
    const titleInputRef = useRef();
    const imageInputRef = useRef();
    const addressInputRef = useRef();
    const descriptionInputRef = useRef();

    function changeHandler(event) {
        event.preventDefault();
        const value = event.target.value
        const target = event.target.id

        const meetupData = {
            ...meetup,
            [target]: value
        };

        setMeetup(meetupData);
    }

    async function submitHandler(event) {
        console.log(meetup)
        event.preventDefault()

        const response = await fetch('/api/update-meetup', {
            method: 'POST',
            body: JSON.stringify(meetup),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()
        router.push(`/${meetup._id}`);
        setOpen(false)
    }
    
    return (
        <Dialog open={open} onClose={handleClose}>
            <Card>
                <form className={classes.form} onSubmit={submitHandler}>
                    <div className={classes.control}>
                        <label htmlFor="title">Meetup Title</label>
                        <input
                            type="text"
                            required
                            id="title"
                            ref={titleInputRef}
                            onChange={changeHandler}
                            value={meetup.title}
                        />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="image">Meetup Image</label>
                        <input
                            type="url"
                            required
                            id="image"
                            ref={imageInputRef}
                            onChange={changeHandler}
                            value={meetup.image}
                        />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            required
                            id="address"
                            ref={addressInputRef}
                            onChange={changeHandler}
                            value={meetup.address}
                        />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            required
                            rows="5"
                            ref={descriptionInputRef}
                            onChange={changeHandler}
                            value={meetup.description}
                        ></textarea>
                    </div>
                    <div className={classes.actions}>
                        <button>Edit Meetup</button>
                    </div>
                </form>
            </Card>
        </Dialog>
    );
}
