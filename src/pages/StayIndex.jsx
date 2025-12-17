import { userService } from '../services/user/index.js'

export function StayIndex() {

    return (
        <main className="stay-index">
            <header>
                <h2>Stays</h2>
                {userService.getLoggedinUser() && <button onClick={onAddStay}>Add a Stay</button>}
            </header>
        </main>
    )
}