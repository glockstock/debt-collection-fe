// Format currency amounts
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

// Format date string
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

// Calculate days past due
export const calculateDaysPastDue = (debtDate: string): number => {
  const debt = new Date(debtDate);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - debt.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Get full name
export const getFullName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`;
}; 