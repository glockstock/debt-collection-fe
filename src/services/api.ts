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
      // Ensure tenant data matches expected API format from Swagger UI
      const tenantData = {
        first_name: tenant.first_name,
        last_name: tenant.last_name,
        phone_number: tenant.phone_number,
        email: tenant.email,
        property: tenant.property,
        debt_amount: tenant.debt_amount,
        debt_date: tenant.debt_date
      };
      
      console.log('Creating tenant with data:', tenantData);
      
      // Our axiosConfig automatically extracts response.data via interceptor
      // Use any as intermediate type to help TypeScript understand the transformation
      const response = await api.post<any, Tenant>('/tenant/create/', tenantData);
      console.log('Create tenant response:', response);
      
      return response;
    } catch (error) {
      console.error('Error creating tenant:', error);
      throw error;
    }
  },

  // Update a tenant
  updateTenant: async (tenant: Tenant): Promise<Tenant> => {
    try {
      // Ensure tenant data matches expected API format from Swagger UI
      const tenantData = {
        id: tenant.id,
        first_name: tenant.first_name,
        last_name: tenant.last_name,
        phone_number: tenant.phone_number,
        email: tenant.email,
        property: tenant.property,
        debt_amount: tenant.debt_amount,
        debt_date: tenant.debt_date,
        thread_id: tenant.thread_id,
        assistant_id: tenant.assistant_id
      };
      
      console.log('Updating tenant with data:', tenantData);
      
      // Our axiosConfig automatically extracts response.data via interceptor
      const response = await api.put<any, Tenant>('/tenant/update', tenantData);
      console.log('Update tenant response:', response);
      
      return response;
    } catch (error) {
      console.error(`Error updating tenant with ID ${tenant.id}:`, error);
      throw error;
    }
  },

  // Delete a tenant
  deleteTenant: async (id: string): Promise<void> => {
    try {
      // API expects a JSON body with the id
      const tenantData = { id };
      console.log('Deleting tenant with ID:', id);
      
      // Send DELETE request with the tenant ID in the request body
      await api.delete('/tenant/delete/', { 
        data: tenantData // axios delete with request body
      });
      console.log('Tenant deleted successfully');
      
      return;
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