import { create } from 'zustand'
import { getAuthToken as getToken } from '@/lib/auth'
interface AuthStore {
	// State
	isAuth: boolean
	privateKey: string | null

	// Actions
	setPrivateKey: (key: string) => void
	clearAuth: () => void
	refreshAuthState: () => void
	getAuthToken: () => Promise<string>
}

export const useAuthStore = create<AuthStore>((set, get) => ({
	isAuth: false,
	privateKey: null,

	setPrivateKey: (key: string) => {
		set({ isAuth: true, privateKey: key })
	},

	clearAuth: () => {
		set({ isAuth: false, privateKey: null })
	},

	refreshAuthState: async () => {
		set(state => ({ isAuth: Boolean(state.privateKey) }))
	},

	getAuthToken: async () => {
		const token = await getToken()
		get().refreshAuthState()
		return token
	}
}))
