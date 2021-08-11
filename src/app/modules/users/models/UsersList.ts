import { PaginatedList } from 'src/app/shared/models/PaginatedList';
import { User } from './User';

export interface UsersList extends PaginatedList<User> {}
