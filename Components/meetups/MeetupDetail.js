/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import classes from "./Meetupdetail.module.css";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import FormDialog from "./EditMeetup";

function MeetupDetails(props) {
    const [open, setOpen] = useState(false);
    const [meetup, setMeetup] = useState({});

    const router = useRouter();
    const id = router.query.meetupId;

    async function handleClickOpen() {
        const response = await fetch("/api/get-edit-meetup", {
            method: "POST",
            body: JSON.stringify(id),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        setMeetup(data);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    async function deleteHandler(id) {
        const response = await fetch("/api/delete-meetup", {
            method: "POST",
            body: JSON.stringify(id),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        console.log(data);

        router.push("/");
    }

    return (
        <section className={classes.detail}>
            <img src={props.image} alt={props.title} />
            <h1>{props.title}</h1>
            <address>{props.address}</address>
            <p>{props.description}</p>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "2rem",
                }}
            >
                <div className={classes.actions} style={{ paddingTop: 0 }}>
                    <button onClick={() => deleteHandler(props.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
                <div className={classes.actions} style={{ paddingTop: 0 }}>
                    <button onClick={handleClickOpen}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <FormDialog
                        handleClose={handleClose}
                        open={open}
                        meetup={meetup}
                        setMeetup={setMeetup}
                        setOpen={setOpen}
                    />
                </div>
            </div>
        </section>
    );
}

export default MeetupDetails;
