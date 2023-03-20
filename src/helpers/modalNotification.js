import Swal from "sweetalert2";
export const modalNotification = (title, icon) => {
    setTimeout(() => {
        Swal.fire({
            position: "center",
            icon: `${icon}`,
            title,
            showConfirmButton: false,
            timer: 1500
        })
    }, 20);
};

export const modalNotificationSuccess = (title) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title
    })
}
