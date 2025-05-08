export type FunctionComponent = React.ReactElement | null;

type HeroIconSVGProps = React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> &
	React.RefAttributes<SVGSVGElement>;
type IconProps = HeroIconSVGProps & {
	title?: string;
	titleId?: string;
};
export type Heroicon = React.FC<IconProps>;

export interface User {
	id: number;
	email: string;
	username: string | null;
	name: string | null;
	role: string;
	language: string;
	created_at: Date;
	updated_at: Date;
}

export interface Post {
	id: number;
	title: string;
	content: string;
	created_at: Date;
	updated_at: Date;
	user: User;
}
