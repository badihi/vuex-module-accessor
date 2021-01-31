import ModuleState from './ModuleState';
import { StoreContext } from './StoreContext';

export default abstract class Module<TState extends ModuleState> {
	state: TState;
	protected context: StoreContext<TState>;
	namespace: string | null = null;
	$t: (text: string, params?: string[] | { (k: string): string }) => string;

	get __module__(): string {
		return '';
	}

	constructor(State: { new (...args: any[]): TState }) {
		const state = new State();
		this.state = state;
		this.context = {
			state
		};
		this.$t = () => '';
	}

	useModule<TModule>(
		moduleAccessor: (context: StoreContext<TState>) => TModule
	) {
		return moduleAccessor(this.context);
	}
}
