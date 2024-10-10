// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
namespace App {
	interface Error {
		message: string;
		code?: number;
		details?: string;
		timestamp?: Date;
	}
}