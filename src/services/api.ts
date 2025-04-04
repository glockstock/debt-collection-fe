import api from './axiosConfig';
import { Tenant } from '../types/api';

// Tenant API endpoints
export const tenantsApi = {
  // Get all tenants
  getAllTenants: async (): Promise<Tenant[]> => {
    try {
      return await api.get('/tenant/get_all/');
    } catch (error) {
      console.error('Error fetching tenants:', error);
      throw error;
    }
  },

  // Get a single tenant by ID
  getTenantById: async (id: string): Promise<Tenant> => {
    try {
      return await api.get('/tenant/get/', { 
        params: { tenant_id: id } 
      });
    } catch (error) {
      console.error(`Error fetching tenant with ID ${id}:`, error);
      throw error;
    }
  },

  // Create a new tenant
  createTenant: async (tenant: Omit<Tenant, 'id' | 'created_at' | 'thread_id' | 'assistant_id'>): Promise<Tenant> => {
    try {
      return await api.post('/tenant/create/', tenant);
    } catch (error) {
      console.error('Error creating tenant:', error);
      throw error;
    }
  },

  // Update a tenant
  updateTenant: async (id: string, tenant: Partial<Tenant>): Promise<Tenant> => {
    try {
      return await api.put(`/tenant/update/${id}`, tenant);
    } catch (error) {
      console.error(`Error updating tenant with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete a tenant
  deleteTenant: async (id: string): Promise<void> => {
    try {
      return await api.delete(`/tenant/delete/${id}`);
    } catch (error) {
      console.error(`Error deleting tenant with ID ${id}:`, error);
      throw error;
    }
  }
};

// Export additional API services as needed
export default {
  tenants: tenantsApi
  // Add other API services here as needed
}; 