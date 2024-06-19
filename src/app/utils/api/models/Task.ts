export interface TaskView {
    id:          string;
    description: string;
    deadline:    string;
}


export interface TaskCreate {
    description: string;
    status:      string;
    deadline:    string;
}

export interface TaskEdit {
    id: string;
    description: string;
    deadline:    string;
    status:      string;
}
