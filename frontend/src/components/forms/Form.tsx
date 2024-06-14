import clsx from 'clsx';

export interface FormProps {
  children: React.ReactNode;
  className?: string;
}

export default function Form(props: FormProps): JSX.Element {
  const { children, className = '' } = props;

  const formStyles = clsx('rgf-form', {
    [className]: !!className,
  });

  return <form className={formStyles}>{children}</form>;
}
