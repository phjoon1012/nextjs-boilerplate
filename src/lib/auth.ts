// Simple admin check - you can replace this with your actual auth logic
export function isAdmin(): boolean {
  // For now, check if user is admin via localStorage or environment variable
  // You can replace this with your actual authentication logic
  if (typeof window !== 'undefined') {
    return localStorage.getItem('isAdmin') === 'true' || 
           process.env.NEXT_PUBLIC_IS_ADMIN === 'true';
  }
  return process.env.NEXT_PUBLIC_IS_ADMIN === 'true';
}

// Function to set admin status (for testing)
export function setAdminStatus(isAdmin: boolean): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('isAdmin', isAdmin.toString());
  }
} 