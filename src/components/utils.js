
export const priority = {
    HIGH: {
        title: 'high',
        value: 3,
    },
    MEDIUM: {
        title: 'medium',
        value: 2,
    },
    LOW: {
        title: 'low',
        value: 1,
    }
}

export const getFilteredData = (filters, data) => {
    return data.filter(item => {
      const filterPriority = filters.PRIORITY.includes(item.priority.title) || filters.PRIORITY.length === 0;
      const filterStatus = filters.STATUS.length === 0 || 
                           (filters.STATUS.includes('completed') && item.isCompleted) || 
                           (filters.STATUS.includes('in-progress') && !item.isCompleted);
      const filterDueDate = filters.DUEDATE.length === 0 || filters.DUEDATE.some(dueDateFilter => {
        const today = new Date();
        return dueDateFilter === 'dueDate' &&
               item.dueDate.getFullYear() === today.getFullYear() &&
               item.dueDate.getMonth() === today.getMonth() &&
               item.dueDate.getDate() === today.getDate();
      });
  
      return filterPriority && filterStatus && filterDueDate;
    });
  };

export const getSortedTodoData = (sortBy, data) => {
    if (sortBy === 'priority') {
        return data.sort((a, b) => b.priority.value - a.priority.value);
    }
    return data;
};

export const filters = {
    'PRIORITY' : {
        title: 'Priority',
        group: "",
        filterValue: ['HIGH', 'MEDIUM', 'LOW']
    },
    'DUEDATE': {
        title: 'Due Date',
        group: '',
        filterValue: ['TODAY']
    },
    'STATUS': {
        title: 'Status',
        group: '',
        filterValue: ['COMPLETED', 'INPROGRESS']
    },
    'COMPLETED': {
        title: 'Completed',
        group: 'completed',
        filterValue: ['COMPLETED', 'INPROGRESS']
    },
    'INPROGRESS': {
        title: 'In Progress',
        group: 'in-progress',
        filterValue: []
    },
    'TODAY': {
        title: 'Today',
        group: 'dueDate',
        filterValue: []
    },
    'HIGH': {
        title: 'High',
        group: 'high',
        filterValue: []
    },
    'MEDIUM': {
        title: 'Medium',
        group: 'medium',
        filterValue: []
    },
    'LOW': {
        title: 'Low',
        group: 'low',
        filterValue: []
    },
}

export const sortByOptions = [
    { id: 1, title: 'Priority (High to Low)', key: 'priority', value: 'desc' },
    { id: 2, title: 'Priority (Low to High)', key: 'priority', value: 'asc' },
    { id: 3, title: 'Due Date (Desc)', key: 'dueDate', value: 'desc' }
  ];
  