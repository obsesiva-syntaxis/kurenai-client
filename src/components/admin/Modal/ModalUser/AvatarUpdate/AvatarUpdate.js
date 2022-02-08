import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/client';
import { UPDATE_AVATAR } from '../../../../../graphql/user';
import Swal from 'sweetalert2';

import './AvatarUpdate.scss';

export default function AvatarUpdate( props ) {
    const { auth,  setShowModal } = props;
    const [fileUpload, setFileUpload] = useState(null);
    const [ updateAvatar ] = useMutation(UPDATE_AVATAR);

    const onDrop = useCallback(( acceptedFile ) => {
        const file = acceptedFile[0];
        setFileUpload({
            type: 'image',
            file,
            preview: URL.createObjectURL(file),
        });
    });

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg, image/png, image/jpg',
        noKeyboard: true,
        multiple: false,
        onDrop
    });

    const onUpdate = async () => {
        try {
            const result = await updateAvatar({
                variables: {
                    file: fileUpload.file
                }
            });
            const { data } = result;
            if(!data.updateAvatar.status){
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Cambio de avatar exitoso!',
                    text: 'Procediendo a refrescar la página',
                }).then(result => {
                    if (result.isConfirmed) {
                        setShowModal(false);
                        window.location.reload();
                    }
                });
                
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="avatar-update">
            <div {...getRootProps()} className="avatar-update__box">
                
                {
                    !fileUpload ? 
                    (<div className="avatar-update__box-avatar" style={{ backgroundImage: `url(${ auth.avatarUrl })` }} alt="" />)
                    :
                    (<div className="avatar-update__box-avatar" style={{ backgroundImage: `url(${ fileUpload.preview })` }} alt="" />)
                }
                <i className="fas fa-pen"></i>
                <input {...getInputProps()} />
            </div>

            <div className="avatar-update__actions">
                {
                    !fileUpload ? 
                    (<button disabled>Subir</button>)
                    :
                    (<button onClick={ onUpdate }>Subir</button>)
                }
                
                <button onClick={() => setShowModal(false)}>Cancelar</button>
            </div>
        </div>
    )
}
