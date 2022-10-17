/* eslint-disable @next/next/no-img-element */
import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";
import { useRouter } from "next/router";

function MeetupItem(props) {
    const router = useRouter()

    function showDetailHander() {
        router.push(`/${props.id}`);
    }

    async function deleteHandler(id) {
        const response = await fetch('/api/delete-meetup', {
            method: 'POST',
            body: JSON.stringify(id),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()
        console.log(data);

        router.push('/');
    }

    return (
        <li className={classes.item}>
            <Card>
                <div className={classes.image}>
                    <img src={props.image} alt={props.title} />
                </div>
                <div className={classes.content}>
                    <h3>{props.title}</h3>
                    <address>{props.address}</address>
                </div>
                <div className={classes.actions}>
                    <button onClick={showDetailHander}>Show Details</button>
                </div>
                <div className={classes.actions} style={{paddingTop: 0}}>
                    <button onClick={() => deleteHandler(props.id)}>Delete</button>
                </div>
            </Card>
        </li>
    );
}

export default MeetupItem;
