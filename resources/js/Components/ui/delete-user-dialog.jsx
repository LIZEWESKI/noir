import React, { useRef } from 'react'
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogHeader,
    AlertDialogAction,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Form } from '@inertiajs/react';

const DeleteUserDialog = ({guestId, open, onOpenChange}) => {
    const passwordInput = useRef(null);
  return (
    <AlertDialog 
        open={open} 
        onOpenChange={onOpenChange}
    >
        <AlertDialogContent>
            <AlertDialogTitle>Are you sure you want to delete this account?</AlertDialogTitle>
            <AlertDialogDescription>
                Once the account is deleted, all of its resources and data will also be permanently deleted. Please enter your password
                to confirm you would like to permanently delete this account.
            </AlertDialogDescription>
            {guestId && (
                <Form
                    method="delete"
                    action={route('admin.guests-management.destroy',guestId)}
                    options={{
                        preserveScroll: true,
                    }}
                    onError={() => passwordInput.current?.focus()}
                    resetOnSuccess
                    onSuccess={() => {
                        onOpenChange(false);
                    }}
                    className="space-y-6"
                >
                    {({ resetAndClearErrors, processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="password" className="sr-only">
                                    Password
                                </Label>

                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    ref={passwordInput}
                                    placeholder="Password"
                                    autoComplete="current-password"
                                />
                                {errors.password && <p className="text-sm text-destructive font-medium ">{errors.password}</p>}

                            </div>

                            <AlertDialogFooter className="gap-2">
                                <AlertDialogCancel asChild>
                                    <Button variant="secondary" onClick={() => resetAndClearErrors()}>
                                        Cancel
                                    </Button>
                                </AlertDialogCancel>

                                <Button variant="destructive" disabled={processing} asChild>
                                    <button type="submit">Delete account</button>
                                </Button>
                            </AlertDialogFooter>
                        </>
                    )}
                </Form>
            )}
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteUserDialog;