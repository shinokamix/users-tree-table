import { UserTable } from '@/components/tables/UserTable';
import { INITIAL_USERS } from '@/data/users';

export default function Home() {
    return (
        <main>
            <UserTable initialData={INITIAL_USERS} />
        </main>
    );
}
