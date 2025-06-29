import { css } from "~styled-system/css";

// Style pour l'arrière-plan (inchangé)
export const BackgroundCSS = css({
  objectFit: "cover",
  objectPosition: "0% 100%",
  width: "100%",
  height: "100%",
  zIndex: -1,
  position: "fixed",
  top: 0,
  left: 0,
});

// Style pour le conteneur principal (ajout responsive uniquement)
export const LoginContainerCSS = css({
  color: "white",
  display: "flex",
  justifyContent: "center",

  height: "65vh",
  alignItems:"center",
  width: "100%",
  position: "relative",
  // Ajout responsive
  padding: {
    base: "15px", // Petit padding sur mobile
    md: "0", // Pas de padding sur desktop
  },
});

// Style pour le formulaire (ajout responsive uniquement)
export const FormCSS = css({
  display: "flex",
  justifyContent: "flex-start",
  flexDirection: "column",
  gap: "20px",
  position: "relative",
  // Ajout responsive pour marginTop
  marginTop: {
    base: "40px", // Moins de marge en haut sur mobile
    md: "80px", // Marge originale sur desktop
  },
  // Ajout responsive pour width
  width: {
    base: "min(90%, 359px)", // Clamp à 90% ou 359px, le plus petit des deux
  },
});

// Style pour le conteneur des inputs (inchangé)
export const InputContainerCSS = css({
  display: "flex",
  flexDirection: "column",
  gap: "0px",
  width: "100%",
  fontFamily: "JBM-semibold !important",
});

// Style pour le titre (ajout du clamp pour responsive)
export const TitleCSS = css({
  fontFamily: "Helvetica",
  textDecoration: "line-through",
  alignSelf: "flex-start",
  // Clamp pour la taille de police
  fontSize: {
    base: "clamp(36px, 8vw, 50px)", // Se met à l'échelle entre 36px et 60px
  },
});

// Style pour les inputs avec trait (ajout du clamp pour responsive)
export const LineInput = css({
  border: "none",
  borderBottom: "1px solid",
  borderColor: "white",
  bg: "transparent",
  color: "white",
  outline: "none",
  py: 0,
  pb: "4px",
  px: "0",
  lineHeight: "1.2",
  display: "block",
  verticalAlign: "bottom",
  marginTop: "40px",
  boxSizing: "border-box",
  position: "relative",
  height: "auto",
  minHeight: "40px",

  // Ajout responsive avec clamp
  width: "100%", // Toujours 100% de la largeur du parent
  // Clamp pour la taille de police
  fontSize: {
    base: "clamp(20px, 5vw, 30px)", // Se met à l'échelle entre 20px et 30px
  },

  // Placeholder modifié pour responsive
  _placeholder: {
    color: "white",
    lineHeight: "1.2",
    fontSize: "inherit", // Hérite de la taille de police du parent
  },

  _focus: {
    borderColor: "white",
    borderBottomWidth: "1.5px",
  },

  // Styles d'autocomplétion (inchangés)
  boxShadow: "0 0 0 1000px transparent inset",
  WebkitTextFillColor: "white",
  caretColor: "white",

  "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active":
    {
      boxShadow: "0 0 0 1000px transparent inset !important",
      WebkitTextFillColor: "white !important",
      backgroundColor: "transparent !important",
      backgroundClip: "content-box !important",
      border: "none !important",
      borderBottom: "1px solid white !important",
      transition: "all 5000s ease-in-out 0s",
    },

  "&:autofill": {
    backgroundColor: "transparent !important",
    border: "none !important",
    borderBottom: "1px solid white !important",
    color: "white !important",
  },

  "&, &:-webkit-autofill": {
    "&::first-line": {
      color: "white",
    },
  },

  "&::-webkit-input-placeholder": {
    lineHeight: "normal",
  },

  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "100%",
    height: "1px",
    backgroundColor: "transparent",
    pointerEvents: "none",
  },
});

// Style pour les messages d'erreur (inchangé)
export const ErrorMessageCSS = css({
  color: "rgba(255, 100, 100, 1)",
  fontSize: "14px",
  marginTop: "4px",
  fontFamily: "JBM-semibold",
});

// Style pour l'instruction d'appui sur Enter (ajout responsive uniquement)
export const InfoTextCSS = css({
  color: "rgba(255, 255, 255, 0.8)",
  fontFamily: "Helvetica",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  marginTop: "20px",
  padding: "6px 0",
  width: "100%",

  // Clamp pour la taille de police
  fontSize: {
    base: "clamp(12px, 3vw, 14px)", // Se met à l'échelle entre 12px et 14px
  },
});

// Style pour la touche du clavier (ajout du clamp pour responsive)
export const KeyboardKeyCSS = css({
  display: "inline-block",
  padding: "2px 8px",
  border: "1px solid rgba(255, 255, 255, 0.4)",
  borderRadius: "2px",
  fontFamily: "monospace",
  marginLeft: "4px",
  marginRight: "4px",
  color: "white",
  background: "rgba(255, 255, 255, 0.1)",

  // Clamp pour la taille de police
  fontSize: {
    base: "clamp(10px, 2.5vw, 12px)", // Se met à l'échelle entre 10px et 12px
  },
});

// Style pour le bloc d'informations de connexion invité (corrigé pour être toujours en bas à gauche)
export const GuestInfoCSS = css({
  color: "rgba(255, 255, 255, 0.6)",
  fontFamily: "JBM-semibold",
  padding: "12px 16px",
  background: "rgba(0, 0, 0, 0.3)",
  backdropFilter: "blur(5px)",
  borderRadius: "0",
  position: "fixed", // Fixé à l'écran plutôt qu'absolu au conteneur
  zIndex: 5,

  // Responsive size adjustments
  width: {
    base: "min(calc(100% - 40px), 250px)", // S'adapte aux petits écrans avec marges
  },

  // Position toujours en bas à gauche, mais ajustée selon la taille d'écran
  bottom: {
    base: "20px", // Plus près du bas sur mobile
    md: "40px", // Standard sur desktop
  },
  left: {
    base: "20px", // Plus près du côté sur mobile
    md: "40px", // Standard sur desktop
  },

  // Clamp pour la taille de police adapté pour s'assurer de la lisibilité
  fontSize: {
    base: "clamp(10px, 2.5vw, 14px)",
  },
});

// Style pour le titre du bloc d'infos invité (légèrement ajusté)
export const GuestInfoTitleCSS = css({
  margin: 0,
  marginBottom: "8px",
  color: "white",
  fontFamily: "Helvetica",
  fontWeight: "normal",
  textTransform: "uppercase",
  letterSpacing: "1px",
  fontSize: {
    base: "clamp(12px, 3vw, 16px)",
  },
});

// Style pour les libellés des identifiants (légèrement ajusté)
export const CredentialLabelCSS = css({
  margin: 0,
  marginBottom: "4px",
  color: "white",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: {
    base: "clamp(12px, 3.5vw, 18px)",
  },
});

// Style pour les valeurs d'identifiants (protection contre les débordements)
export const CredentialValueCSS = css({
  color: "#FFE361",
  fontWeight: "bold",
  letterSpacing: "0.5px",
  fontSize: {
    base: "clamp(12px, 4vw, 20px)",
  },
  // Protection contre les débordements
  maxWidth: "120px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});
// Style pour l'étiquette Username/Password (ajout du clamp pour responsive)
export const UserLoginCSS = css({
  // Clamp pour la taille de police
  fontSize: {
    base: "clamp(24px, 6vw, 30px)", // Se met à l'échelle entre 24px et 30px
  },
});
