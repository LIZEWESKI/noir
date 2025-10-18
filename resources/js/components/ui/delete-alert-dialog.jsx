import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import React from 'react'

const DeleteAlertDialog = ({
  open,
  onOpenChange,
  title, 
  action, 
  description,
  children,
  className}
) => {
  return (
    <AlertDialog 
      className={className}
      open={open} 
      onOpenChange={onOpenChange}
    >
      {children && (
          <AlertDialogTrigger asChild>
              {children}
          </AlertDialogTrigger>
      )}
      <AlertDialogContent>
          <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
              {description}
          </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
          <AlertDialogAction 
          className="bg-danger text-white transition-colors duration-300 hover:text-destructive hover:bg-white" 
          onClick={() => action()}
          >Confirm</AlertDialogAction>
          </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteAlertDialog