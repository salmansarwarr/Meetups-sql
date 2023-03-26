import Link from "next/link";
import classes from "./MainNavigation.module.css";

function MainNavigation() {
    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <Link href="/">React Meetups</Link>
            </div>
            <nav>
                <ul>
                    <li className={classes.allNew}>
                        <Link href="/">All Meetups</Link>
                    </li>
                    <li className={classes.addNew}>
                        <Link href="/new-meetup">Add New Meetup</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;
