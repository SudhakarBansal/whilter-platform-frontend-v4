import React from 'react'
import { UserFilters } from './filter';
import { UserCard } from './user-card';

const UsersList = ({ users }: any) => {
    return (
        <div>
            <UserFilters />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-[55px] w-full">
                {users.map((user, index) => (
                    <UserCard
                        key={index}
                        user={user}
                    />
                ))}
            </div>
        </div>
    )
}

export default UsersList;
