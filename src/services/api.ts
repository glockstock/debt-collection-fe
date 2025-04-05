import api from './axiosConfig';
import { Tenant } from '../types/api';
import axios from 'axios';

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

// Agent API endpoints
export const agentApi = {
  // Make an outbound call
  makeOutboundCall: async (phoneNumber: string): Promise<string> => {
    try {
      // Create a new axios instance for the agent API
      const agentApiUrl = 'https://collect-ai-agent-337679415316.us-central1.run.app';
      
      // Format phone number to ensure it has +1 at the beginning
      let formattedNumber = phoneNumber;
      
      // First remove all non-digit characters
      const digitsOnly = phoneNumber.replace(/\D/g, '');
      
      // Ensure it has +1 prefix
      if (phoneNumber.startsWith('+1')) {
        // Already in correct format
        formattedNumber = phoneNumber;
      } else if (phoneNumber.startsWith('1')) {
        // Has 1 but missing +
        formattedNumber = '+' + phoneNumber;
      } else {
        // Missing country code completely
        formattedNumber = '+1' + digitsOnly;
      }
      
      console.log('Making outbound call to:', formattedNumber);
      
      // URL encode the phone number to handle the + sign properly
      const encodedPhoneNumber = encodeURIComponent(formattedNumber);
      
      // Send the request with the phone number as a query parameter
      const url = `${agentApiUrl}/call/outbound?to_number=${encodedPhoneNumber}`;
      console.log('Request URL:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        }
        // No body needed since we're using query parameters
      });
      
      // Get response as text first to inspect it
      const responseText = await response.text();
      console.log('Response text:', responseText);
      
      if (!response.ok) {
        console.error('API Error Response:', responseText);
        throw new Error(`Error making outbound call: ${response.status} - ${responseText}`);
      }
      
      // Try to parse as JSON if possible, otherwise return the text
      try {
        return JSON.parse(responseText);
      } catch (e) {
        return responseText;
      }
      
    } catch (error) {
      console.error('Error making outbound call:', error);
      throw error;
    }
  },
  
  // Send SMS
  sendSms: async (phoneNumber: string): Promise<string> => {
    try {
      // Create a new axios instance for the agent API
      const agentApiUrl = 'https://collect-ai-agent-337679415316.us-central1.run.app';
      
      // Format phone number to ensure it has +1 at the beginning
      let formattedNumber = phoneNumber;
      
      // First remove all non-digit characters
      const digitsOnly = phoneNumber.replace(/\D/g, '');
      
      // Ensure it has +1 prefix
      if (phoneNumber.startsWith('+1')) {
        // Already in correct format
        formattedNumber = phoneNumber;
      } else if (phoneNumber.startsWith('1')) {
        // Has 1 but missing +
        formattedNumber = '+' + phoneNumber;
      } else {
        // Missing country code completely
        formattedNumber = '+1' + digitsOnly;
      }
      
      console.log('Sending SMS to:', formattedNumber);
      
      // Directly construct the form data string
      const formBody = `to_number=${encodeURIComponent(formattedNumber)}`;
      console.log('Form body:', formBody);
      
      // Use axios with form-urlencoded
      const response = await axios.post(
        `${agentApiUrl}/sms/start`, 
        formBody, 
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      
      console.log('SMS response:', response.data);
      return response.data;
      
    } catch (error) {
      console.error('Error sending SMS:', error);
      throw error;
    }
  }
}; 